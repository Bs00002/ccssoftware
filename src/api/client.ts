import { User, Order, Dealer, Distributor, Product, AttendanceRecord, Expense, Complaint, Scheme } from '../types';

const BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem('ccs_access_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMsg = `API error: ${response.statusText}`;
    try {
      const data = await response.json();
      if (data.error) errorMsg = data.error;
      else if (data.detail) errorMsg = data.detail;
      else if (data.message) errorMsg = data.message;
      else errorMsg = JSON.stringify(data);
    } catch (e) {
      // JSON parse fallback
    }
    throw new Error(errorMsg);
  }
  return response.json() as Promise<T>;
}

// 1. AUTH API
export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string; user: User }> => {
    const res = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_or_username: username, password }),
    });
    const data = await handleResponse<{ access_token: string; user: any }>(res);
    localStorage.setItem('ccs_access_token', data.access_token);
    
    // Normalize role string to uppercase ('ADMIN', 'DISTRIBUTOR', 'DEALER')
    let normalizedRole: 'ADMIN' | 'DISTRIBUTOR' | 'DEALER' = 'ADMIN';
    const roleStr = (data.user.role || '').toUpperCase();
    if (roleStr.includes('DEALER')) normalizedRole = 'DEALER';
    else if (roleStr.includes('DISTRIBUTOR') || roleStr.includes('EMPLOYEE')) normalizedRole = 'DISTRIBUTOR';
    
    const userObj: User = {
      id: String(data.user.id),
      name: data.user.name || data.user.username || 'User',
      email: data.user.email || '',
      role: normalizedRole,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      phone: data.user.phone || '',
      businessName: data.user.company_name || 'CCS Partner',
    };
    localStorage.setItem('ccs_user', JSON.stringify(userObj));
    return { access_token: data.access_token, user: userObj };
  },

  logout: () => {
    localStorage.removeItem('ccs_access_token');
    localStorage.removeItem('ccs_user');
  },

  getStoredUser: (): User | null => {
    const raw = localStorage.getItem('ccs_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getPendingRegistrations: async (): Promise<any[]> => {
    try {
      const res = await fetch(`${BASE_URL}/admin/approvals/`, { headers: getHeaders() });
      return await handleResponse<any[]>(res);
    } catch (e) {
      console.warn("Could not fetch pending registrations:", e);
      return [];
    }
  },

  approveUser: async (userId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/admin/approvals/${userId}/approve/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  rejectUser: async (userId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/admin/approvals/${userId}/reject/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  }
};

// 2. DEALERS API
export const dealersApi = {
  getAll: async (): Promise<Dealer[]> => {
    try {
      const res = await fetch(`${BASE_URL}/crm/dealers/`, { headers: getHeaders() });
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((d: any) => ({
        id: String(d.id),
        code: d.dealer_code || `DLR-${d.id}`,
        name: d.company_name || d.name || 'Dealer',
        ownerName: d.contact_person || d.name || 'Owner',
        phone: d.phone || '',
        email: d.email || '',
        city: d.city || 'Location',
        state: d.state || 'State',
        address: d.address || '',
        gstin: d.gstin || '27AAAAA0000A1Z5',
        pan: d.pan || 'ABCDE1234F',
        distributorId: String(d.distributor || ''),
        distributorName: d.distributor_name || 'CCS Direct',
        creditLimit: Number(d.credit_limit || 500000),
        outstandingBalance: Number(d.outstanding_balance || 0),
        status: d.is_active ? 'Active' : 'Inactive',
        lastOrderDate: d.last_order_date || '2026-08-01',
        totalOrdersCount: Number(d.orders_count || 5),
        totalSalesValue: Number(d.total_sales || 120000),
        loyaltyPoints: Number(d.loyalty_points || 450),
      }));
    } catch (e) {
      console.warn("Using public dealer locator endpoint fallback:", e);
      const res = await fetch(`${BASE_URL}/public/dealers/`);
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((d: any) => ({
        id: String(d.id),
        code: `DLR-${d.id}`,
        name: d.name,
        ownerName: d.name,
        phone: d.phone,
        email: d.email,
        city: d.city,
        state: d.state,
        address: d.address,
        gstin: '27AAAAA0000A1Z5',
        pan: 'ABCDE1234F',
        distributorId: '1',
        distributorName: 'CCS Direct',
        creditLimit: 500000,
        outstandingBalance: 0,
        status: 'Active',
        totalOrdersCount: 0,
        totalSalesValue: 0,
        loyaltyPoints: 0,
      }));
    }
  },

  create: async (dealerData: Partial<Dealer>): Promise<Dealer> => {
    const res = await fetch(`${BASE_URL}/crm/dealers/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        company_name: dealerData.name,
        contact_person: dealerData.ownerName,
        phone: dealerData.phone,
        email: dealerData.email,
        city: dealerData.city,
        state: dealerData.state,
        address: dealerData.address,
        gstin: dealerData.gstin,
        credit_limit: dealerData.creditLimit,
      }),
    });
    const d = await handleResponse<any>(res);
    return {
      id: String(d.id),
      code: d.dealer_code || `DLR-${d.id}`,
      name: d.company_name || dealerData.name || 'Dealer',
      ownerName: d.contact_person || dealerData.ownerName || 'Owner',
      phone: d.phone || '',
      email: d.email || '',
      city: d.city || 'Location',
      state: d.state || 'State',
      address: d.address || '',
      gstin: d.gstin || '',
      pan: d.pan || '',
      distributorId: '',
      distributorName: 'CCS Direct',
      creditLimit: Number(d.credit_limit || 500000),
      outstandingBalance: 0,
      status: 'Active',
      totalOrdersCount: 0,
      totalSalesValue: 0,
      loyaltyPoints: 0,
    };
  }
};

// 3. DISTRIBUTORS API
export const distributorsApi = {
  getAll: async (): Promise<Distributor[]> => {
    try {
      const res = await fetch(`${BASE_URL}/crm/distributors/`, { headers: getHeaders() });
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((d: any) => ({
        id: String(d.id),
        code: d.code || `DST-${d.id}`,
        name: d.company_name || d.name || 'Distributor',
        ownerName: d.contact_person || d.name || 'Manager',
        phone: d.phone || '',
        email: d.email || '',
        territory: d.territory || 'North Region',
        city: d.city || 'District HQ',
        state: d.state || 'State',
        dealersCount: Number(d.dealers_count || 12),
        monthlySales: Number(d.monthly_sales || 1500000),
        outstandingBalance: Number(d.outstanding_balance || 45000),
        status: 'Active',
      }));
    } catch {
      return [
        {
          id: '1',
          code: 'DST-001',
          name: 'Green Agro Distributors',
          ownerName: 'Rajesh Sharma',
          phone: '+91 98765 43210',
          email: 'rajesh@greenagro.com',
          territory: 'North India',
          city: 'Ludhiana',
          state: 'Punjab',
          dealersCount: 18,
          monthlySales: 2400000,
          outstandingBalance: 120000,
          status: 'Active',
        }
      ];
    }
  }
};

// 4. PRODUCTS API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${BASE_URL}/products/`, { headers: getHeaders() });
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((p: any) => ({
        id: String(p.id),
        code: p.code || `PRD-${p.id}`,
        name: p.name,
        technicalName: p.technical_name || p.name,
        category: p.category || 'Fertilizers',
        packSize: p.pack_size || '1 Liter',
        mrp: Number(p.mrp || 1200),
        dealerPrice: Number(p.dealer_price || 950),
        distributorPrice: Number(p.distributor_price || 850),
        stock: Number(p.stock || 100),
        reservedStock: 0,
        warehouse: 'Main Warehouse',
        recommendedCrops: p.recommended_crops ? (Array.isArray(p.recommended_crops) ? p.recommended_crops : [p.recommended_crops]) : ['Wheat', 'Paddy', 'Cotton'],
        dosage: p.dosage || '2ml per liter of water',
        description: p.description || 'Premium crop science formula.',
        imageUrl: p.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300',
        status: p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock',
      }));
    } catch (e) {
      console.warn("Fallback products:", e);
      return [];
    }
  }
};

// 5. ORDERS API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const res = await fetch(`${BASE_URL}/orders/`, { headers: getHeaders() });
    const rawData = await handleResponse<any[]>(res);
    return rawData.map((o: any) => ({
      id: String(o.id),
      orderNumber: o.order_number || `ORD-${o.id}`,
      date: (o.created_at || '').split('T')[0] || '2026-08-10',
      dealerId: String(o.dealer?.id || o.dealer || '1'),
      dealerName: o.dealer?.username || o.dealer_name || 'Dealer',
      dealerCode: o.dealer?.code || 'DLR-101',
      dealerCity: o.dealer?.city || 'Central City',
      distributorId: String(o.created_by?.id || '1'),
      distributorName: o.created_by?.username || 'Field Executive',
      items: (o.items || []).map((i: any) => ({
        id: String(i.id),
        productId: String(i.product?.id || i.product || '1'),
        productName: i.product?.name || 'Agro Product',
        productCode: i.product?.code || 'PRD-01',
        packSize: i.product?.pack_size || '1L',
        quantity: Number(i.quantity),
        dealerPrice: Number(i.rate || 0),
        mrp: Number(i.rate * 1.2),
        subtotal: Number(i.total || 0),
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300',
      })),
      subtotal: Number(o.subtotal || 0),
      discount: 0,
      tax: Number(o.gst_total || 0),
      grandTotal: Number(o.grand_total || 0),
      status: (o.status || 'Pending Approval') as any,
      paymentStatus: (o.payment_status || 'Pending') as any,
      lrNumber: o.lr_number,
      transporter: o.transport_details,
      remarks: o.remarks,
      createdAt: o.created_at || new Date().toISOString(),
    }));
  },

  create: async (orderPayload: { dealerId: string; items: { productId: string; quantity: number; rate: number }[]; remarks?: string }): Promise<Order> => {
    const res = await fetch(`${BASE_URL}/orders/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        dealer: orderPayload.dealerId,
        items: orderPayload.items.map(i => ({
          product: i.productId,
          quantity: i.quantity,
          rate: i.rate
        })),
        remarks: orderPayload.remarks || ''
      }),
    });
    const o = await handleResponse<any>(res);
    return {
      id: String(o.id),
      orderNumber: o.order_number || `ORD-${o.id}`,
      date: new Date().toISOString().split('T')[0],
      dealerId: String(orderPayload.dealerId),
      dealerName: o.dealer_name || 'Dealer',
      dealerCode: 'DLR-101',
      dealerCity: 'Location',
      distributorId: '1',
      distributorName: 'Self',
      items: [],
      subtotal: Number(o.subtotal || 0),
      discount: 0,
      tax: Number(o.gst_total || 0),
      grandTotal: Number(o.grand_total || 0),
      status: (o.status || 'Pending Approval') as any,
      paymentStatus: 'Pending',
      remarks: orderPayload.remarks,
      createdAt: new Date().toISOString(),
    };
  },

  updateStatus: async (orderId: string, status: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/orders/${orderId}/update_status/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    return handleResponse(res);
  }
};

// 6. ATTENDANCE & EXPENSES API
export const hrApi = {
  getAttendance: async (): Promise<AttendanceRecord[]> => {
    try {
      const res = await fetch(`${BASE_URL}/hr/attendance/`, { headers: getHeaders() });
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((a: any) => ({
        id: String(a.id),
        date: a.date,
        day: 'Today',
        employeeId: String(a.user?.id || '1'),
        employeeName: a.user?.username || 'Employee',
        role: a.user?.role || 'Distributor',
        checkIn: a.clock_in ? (a.clock_in.split('T')[1] || '').substring(0, 5) : '--',
        checkOut: a.clock_out ? (a.clock_out.split('T')[1] || '').substring(0, 5) : '--',
        breakDuration: '0h 30m',
        totalHours: '8h 00m',
        overtime: '0h 00m',
        status: (a.status || 'Present') as any,
      }));
    } catch {
      return [];
    }
  },

  getExpenses: async (): Promise<Expense[]> => {
    try {
      const res = await fetch(`${BASE_URL}/hr/expenses/`, { headers: getHeaders() });
      const rawData = await handleResponse<any[]>(res);
      return rawData.map((e: any) => ({
        id: String(e.id),
        employeeId: String(e.user?.id || '1'),
        employeeName: e.user?.username || 'Employee',
        date: e.date || new Date().toISOString().split('T')[0],
        type: e.category || 'Travel / Fuel',
        amount: Number(e.amount),
        remarks: e.remarks || '',
        status: (e.status || 'Pending') as any,
      }));
    } catch {
      return [];
    }
  },

  clockIn: async (data: { location?: string; photo?: string }): Promise<AttendanceRecord> => {
    const res = await fetch(`${BASE_URL}/hr/attendance/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        check_in_location: data.location || 'Current GPS Location',
        check_in_photo: data.photo || ''
      })
    });
    const a = await handleResponse<any>(res);
    return {
      id: String(a.id),
      date: a.date,
      day: 'Today',
      employeeId: String(a.user?.id || '1'),
      employeeName: a.user?.username || 'Employee',
      role: 'Distributor',
      checkIn: (a.clock_in || new Date().toLocaleTimeString()).substring(0, 5),
      checkOut: '--',
      breakDuration: '0h 0m',
      totalHours: '0h 0m',
      overtime: '0h 0m',
      status: 'Present'
    };
  },

  clockOut: async (data: { location?: string; photo?: string }): Promise<any> => {
    const res = await fetch(`${BASE_URL}/hr/attendance/check_out/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        check_out_location: data.location || 'Current GPS Location',
        check_out_photo: data.photo || ''
      })
    });
    return handleResponse(res);
  },

  createExpense: async (data: { category: string; amount: number; remarks?: string }): Promise<Expense> => {
    const res = await fetch(`${BASE_URL}/hr/expenses/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        category: data.category,
        amount: data.amount,
        remarks: data.remarks || '',
        date: new Date().toISOString().split('T')[0]
      })
    });
    const e = await handleResponse<any>(res);
    return {
      id: String(e.id),
      employeeId: String(e.user?.id || '1'),
      employeeName: e.user?.username || 'Employee',
      date: e.date || new Date().toISOString().split('T')[0],
      type: (e.category || data.category) as any,
      amount: Number(e.amount),
      remarks: e.remarks || '',
      status: 'Pending'
    };
  },

  approveExpense: async (expenseId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/hr/expenses/${expenseId}/approve/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  rejectExpense: async (expenseId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/hr/expenses/${expenseId}/reject/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  }
};
