// Shared order types for cross-module compatibility

export interface BaseOrderItem {
  id: string
  name: string
  description?: string
  quantity: number
  unitPrice: number
  discount?: number
  tax?: number
  total: number
}

export interface BaseOrder {
  id: string
  type: string;
  orderNumber: string
  customerName: string
  customerId: string
  orderDate: Date | string
  dueDate: Date | string
  status: string
  priority?: string
  items: BaseOrderItem[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  notes?: string
  paymentStatus?: string
  paymentTerms?: string
  createdBy: string
  createdAt: Date | string
  updatedAt: Date | string
  source: "crm" | "pos" | "manufacturing" | "finance" | "other"
}

// Manufacturing specific order extensions
export interface ManufacturingOrderItem extends BaseOrderItem {
  materialRequirements?: {
    materialId: string
    materialName: string
    quantity: number
    unit: string
  }[]
  productionSteps?: {
    stepId: string
    stepName: string
    workstationId?: string
    estimatedTime: number // in minutes
    assignedTo?: string
  }[]
  qualityChecklist?: {
    id: string
    name: string
    completed: boolean
  }[]
}

export interface ManufacturingOrder extends BaseOrder {
  productionStatus: "pending" | "in_progress" | "quality_check" | "completed" | "on_hold"
  workstationAssignments?: {
    workstationId: string
    workstationName: string
    startTime?: Date | string
    endTime?: Date | string
    status: string
  }[]
  materialAllocated: boolean
  estimatedProductionTime: number // in minutes
  actualProductionTime?: number // in minutes
  items: ManufacturingOrderItem[]
}

// CRM specific order extensions
export interface CrmOrderItem extends BaseOrderItem {
  customizations?: {
    name: string
    value: string
  }[]
}

export interface CrmOrder extends BaseOrder {
  contactPerson?: string
  contactEmail?: string
  contactPhone?: string
  deliveryAddress?: string
  salesRepId?: string
  salesRepName?: string
  followUpDate?: Date | string
  items: CrmOrderItem[]
}

// POS specific order extensions
export interface PosOrderItem extends BaseOrderItem {
  barcode?: string
  returnPolicy?: string
}

export interface PosOrder extends BaseOrder {
  storeId: string
  storeName: string
  cashierId: string
  cashierName: string
  paymentMethod: string
  receiptNumber: string
  items: PosOrderItem[]
}

// Finance specific order extensions (for invoicing)
export interface FinanceOrderItem extends BaseOrderItem {
  accountCode?: string
  taxCode?: string
}

export interface FinanceOrder extends BaseOrder {
  invoiceNumber?: string
  invoiceDate?: Date | string
  paymentDueDate?: Date | string
  paymentReference?: string
  currency: string
  exchangeRate?: number
  items: FinanceOrderItem[]
}

// Order conversion utilities
export function convertToManufacturingOrder(order: BaseOrder): ManufacturingOrder {
  return {
    ...order,
    productionStatus: "pending",
    materialAllocated: false,
    estimatedProductionTime: calculateEstimatedTime(order),
    items: order.items.map((item) => ({
      ...item,
      materialRequirements: [],
      productionSteps: [],
      qualityChecklist: [],
    })) as ManufacturingOrderItem[],
  }
}

export function convertToFinanceOrder(order: BaseOrder): FinanceOrder {
  return {
    ...order,
    invoiceNumber: `INV-${order.orderNumber.replace("ORD-", "")}`,
    invoiceDate: new Date(),
    paymentDueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
    currency: "AED",
    items: order.items.map((item) => ({
      ...item,
      accountCode: "4000", // Default sales revenue account
      taxCode: "VAT5", // Default VAT code
    })) as FinanceOrderItem[],
  }
}

// Helper function to calculate estimated production time
function calculateEstimatedTime(order: BaseOrder): number {
  // Simple calculation based on number of items and quantity
  let totalTime = 0
  order.items.forEach((item) => {
    // Base time of 60 minutes per item type
    totalTime += 60
    // Add 10 minutes per quantity
    totalTime += item.quantity * 10
  })
  return totalTime
}
