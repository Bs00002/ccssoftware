export type UserRole = 'ADMIN' | 'DISTRIBUTOR' | 'DEALER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  territory?: string;
  code?: string;
  businessName?: string;
  city?: string;
  address?: string;
  gstNumber?: string;
  gstin?: string;
  creditLimit?: number;
  outstandingBalance?: number;
}

export type OrderStatus =
  | 'Draft'
  | 'Submitted'
  | 'Pending Approval'
  | 'Approved'
  | 'Processing'
  | 'Dispatched'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled'
  | 'Rejected';

export type PaymentStatus = 'Paid' | 'Pending' | 'Partial' | 'Overdue';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  packSize: string;
  quantity: number;
  dealerPrice: number;
  mrp: number;
  subtotal: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  dealerId: string;
  dealerName: string;
  dealerCode: string;
  dealerCity: string;
  distributorId: string;
  distributorName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number; // GST 18%
  grandTotal: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  lrNumber?: string;
  transporter?: string;
  expectedDelivery?: string;
  remarks?: string;
  createdByName?: string;
  createdAt: string;
}

export interface Dealer {
  id: string;
  code: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  gstin: string;
  gstNumber?: string;
  pan: string;
  distributorId: string;
  distributorName: string;
  creditLimit: number;
  outstandingBalance: number;
  status: 'Active' | 'Inactive' | 'Pending';
  lastOrderDate?: string;
  totalOrdersCount: number;
  totalSalesValue: number;
  loyaltyPoints: number;
}

export interface Distributor {
  id: string;
  code: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  territory: string;
  city: string;
  state: string;
  dealersCount: number;
  monthlySales: number;
  outstandingBalance: number;
  status: 'Active' | 'Inactive';
}

export interface Product {
  id: string;
  code: string;
  name: string;
  technicalName: string;
  category: 'Fertilizers' | 'Pesticides' | 'Seeds' | 'Bio Products' | 'Fungicides';
  packSize: string;
  mrp: number;
  dealerPrice: number;
  distributorPrice: number;
  stock: number;
  reservedStock: number;
  warehouse: string;
  recommendedCrops: string[];
  dosage: string;
  description: string;
  imageUrl: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface AttendanceRecord {
  id: string;
  sNo?: number;
  date: string; // YYYY-MM-DD
  day: string; // Wed, Tue, etc.
  employeeId: string;
  employeeName: string;
  role: string;
  checkIn: string; // "08:55 AM" or "--"
  checkOut: string; // "06:10 PM" or "--"
  breakDuration?: string; // "1h 0m"
  totalHours?: string; // "8h 15m"
  workingHours?: string;
  overtime?: string; // "0h 15m"
  status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'Leave' | 'Running' | 'Idle';
  locationCheckIn?: string;
  locationCheckOut?: string;
  loginImage?: string;
  logoutImage?: string;
  reason?: string;
}

export interface Expense {
  id: string;
  sNo?: number;
  employeeId: string;
  employeeName: string;
  date: string;
  type: string;
  rideKm?: number;
  totalRideKm?: number;
  busTrainCarFair?: number;
  fairCab?: number;
  fairAuto?: number;
  otherVehicleFair?: number;
  food?: number;
  laundry?: number;
  phoneBill?: number;
  internetBill?: number;
  localConveyance?: number;
  courier?: number;
  photocopy?: number;
  otherCharge?: number;
  amount: number;
  totalAmount?: number;
  approvalAmount?: number;
  dealerVisited?: string;
  billUrl?: string;
  proofImage?: string;
  remarks?: string;
  remark?: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  approvedBy?: string;
}

export interface FieldActivity {
  id: string;
  employeeId: string;
  employeeName: string;
  time: string;
  date: string;
  action: string;
  dealerName?: string;
  location: string;
  type: 'check_in' | 'check_out' | 'order_created' | 'payment_collected' | 'complaint_logged';
}

export interface Scheme {
  id: string;
  title: string;
  code: string;
  applicableCategory: string;
  startDate: string;
  endDate: string;
  targetUnits: number;
  rewardDescription: string;
  status: 'Active' | 'Upcoming' | 'Expired';
  progressPercentage?: number;
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  dealerName: string;
  dealerCode: string;
  productName: string;
  batchNumber?: string;
  issueType: 'Damaged Packaging' | 'Quality Issue' | 'Delivery Delay' | 'Billing Dispute';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  description: string;
  resolutionNotes?: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  reference: string;
  refNumber?: string;
  description?: string;
  type: 'Invoice' | 'Payment Received' | 'Credit Note' | 'Debit';
  debit: number;
  credit: number;
  balance: number;
}
