/**
 * Exercise 7: Order Management System
 * Create an order management system using objects, methods, and JSON processing.
 */

// Product catalog
const productCatalog = {
    1: { id: 1, name: "Laptop", price: 999, category: "Electronics", stock: 10 },
    2: { id: 2, name: "Mouse", price: 25, category: "Electronics", stock: 50 },
    3: { id: 3, name: "Keyboard", price: 75, category: "Electronics", stock: 30 },
    4: { id: 4, name: "Monitor", price: 299, category: "Electronics", stock: 15 },
    5: { id: 5, name: "Headphones", price: 199, category: "Electronics", stock: 25 }
};

// Order Management System
class OrderManager {
    constructor() {
        this.orders = [];
        this.nextOrderId = 1;
        this.customers = {};
    }
    
    // Add customer
    addCustomer(customerData) {
        const { id, name, email, address } = customerData;
        this.customers[id] = {
            id,
            name,
            email,
            address,
            createdAt: new Date(),
            totalOrders: 0,
            totalSpent: 0
        };
        return this.customers[id];
    }
    
    // Create new order
    createOrder(customerId, items) {
        const customer = this.customers[customerId];
        if (!customer) {
            throw new Error(`Customer with ID ${customerId} not found`);
        }
        
        const orderItems = this.validateAndProcessItems(items);
        const totalAmount = this.calculateTotal(orderItems);
        
        const order = {
            id: this.nextOrderId++,
            customerId,
            customerName: customer.name,
            items: orderItems,
            totalAmount,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.orders.push(order);
        this.updateCustomerStats(customerId, totalAmount);
        this.updateStock(orderItems);
        
        return order;
    }
    
    // Validate and process order items
    validateAndProcessItems(items) {
        return items.map(item => {
            const product = productCatalog[item.productId];
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            
            if (item.quantity <= 0) {
                throw new Error(`Invalid quantity for product ${product.name}`);
            }
            
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}`);
            }
            
            return {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: item.quantity,
                subtotal: product.price * item.quantity
            };
        });
    }
    
    // Calculate order total
    calculateTotal(orderItems) {
        return orderItems.reduce((total, item) => total + item.subtotal, 0);
    }
    
    // Update customer statistics
    updateCustomerStats(customerId, amount) {
        const customer = this.customers[customerId];
        customer.totalOrders++;
        customer.totalSpent += amount;
    }
    
    // Update product stock
    updateStock(orderItems) {
        orderItems.forEach(item => {
            productCatalog[item.productId].stock -= item.quantity;
        });
    }
    
    // Update order status
    updateOrderStatus(orderId, newStatus) {
        const order = this.findOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }
        
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}`);
        }
        
        order.status = newStatus;
        order.updatedAt = new Date();
        
        return order;
    }
    
    // Find order by ID
    findOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }
    
    // Get orders by customer
    getOrdersByCustomer(customerId) {
        return this.orders.filter(order => order.customerId === customerId);
    }
    
    // Get orders by status
    getOrdersByStatus(status) {
        return this.orders.filter(order => order.status === status);
    }
    
    // Get order statistics
    getOrderStatistics() {
        const totalOrders = this.orders.length;
        const totalRevenue = this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        const statusCounts = this.orders.reduce((counts, order) => {
            counts[order.status] = (counts[order.status] || 0) + 1;
            return counts;
        }, {});
        
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        return {
            totalOrders,
            totalRevenue,
            averageOrderValue,
            statusDistribution: statusCounts
        };
    }
    
    // Export orders to JSON
    exportOrdersToJSON() {
        const exportData = {
            exportDate: new Date().toISOString(),
            orders: this.orders,
            customers: this.customers,
            statistics: this.getOrderStatistics()
        };
        
        return JSON.stringify(exportData, null, 2);
    }
    
    // Import orders from JSON
    importOrdersFromJSON(jsonString) {
        try {
            const importData = JSON.parse(jsonString);
            
            if (importData.orders) {
                this.orders = importData.orders.map(order => ({
                    ...order,
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt)
                }));
                
                this.nextOrderId = Math.max(...this.orders.map(o => o.id)) + 1;
            }
            
            if (importData.customers) {
                this.customers = importData.customers;
                Object.values(this.customers).forEach(customer => {
                    customer.createdAt = new Date(customer.createdAt);
                });
            }
            
            return true;
        } catch (error) {
            console.error('Error importing orders:', error);
            return false;
        }
    }
}

// Functional approach for order processing
const OrderUtils = {
    // Calculate discount based on order amount
    calculateDiscount(orderAmount, customerType = 'regular') {
        const discountRates = {
            regular: 0,
            premium: 0.05,
            vip: 0.10
        };
        
        const baseDiscount = discountRates[customerType] || 0;
        const volumeDiscount = orderAmount > 1000 ? 0.02 : 0;
        
        return orderAmount * (baseDiscount + volumeDiscount);
    },
    
    // Format order for display
    formatOrderForDisplay(order) {
        return {
            orderNumber: `ORD-${order.id.toString().padStart(6, '0')}`,
            customer: order.customerName,
            itemCount: order.items.length,
            totalAmount: `$${order.totalAmount.toFixed(2)}`,
            status: order.status.toUpperCase(),
            orderDate: order.createdAt.toLocaleDateString()
        };
    },
    
    // Group orders by date
    groupOrdersByDate(orders) {
        return orders.reduce((groups, order) => {
            const date = order.createdAt.toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(order);
            return groups;
        }, {});
    },
    
    // Calculate monthly revenue
    calculateMonthlyRevenue(orders) {
        return orders.reduce((monthly, order) => {
            const month = order.createdAt.toISOString().substring(0, 7); // YYYY-MM
            monthly[month] = (monthly[month] || 0) + order.totalAmount;
            return monthly;
        }, {});
    }
};

// Demo and testing
console.log("🧪 TESTING EXERCISE 7: ORDER MANAGEMENT SYSTEM");
console.log("=" .repeat(70));

// Create order manager instance
const orderManager = new OrderManager();

console.log("👥 Adding Customers:");
const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", address: "456 Oak Ave" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", address: "789 Pine Rd" }
];

customers.forEach(customerData => {
    const customer = orderManager.addCustomer(customerData);
    console.log(`✅ Added customer: ${customer.name} (${customer.email})`);
});

console.log("\n" + "=" .repeat(70));
console.log("📦 Creating Orders:");

// Create sample orders
try {
    const order1 = orderManager.createOrder(1, [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 }
    ]);
    console.log(`✅ Order ${order1.id} created for ${order1.customerName} - Total: $${order1.totalAmount}`);
    
    const order2 = orderManager.createOrder(2, [
        { productId: 3, quantity: 1 },
        { productId: 4, quantity: 1 },
        { productId: 5, quantity: 1 }
    ]);
    console.log(`✅ Order ${order2.id} created for ${order2.customerName} - Total: $${order2.totalAmount}`);
    
    const order3 = orderManager.createOrder(1, [
        { productId: 4, quantity: 2 }
    ]);
    console.log(`✅ Order ${order3.id} created for ${order3.customerName} - Total: $${order3.totalAmount}`);
    
} catch (error) {
    console.error(`❌ Error creating order: ${error.message}`);
}

console.log("\n" + "=" .repeat(70));
console.log("📊 Order Statistics:");
const stats = orderManager.getOrderStatistics();
console.log(`Total Orders: ${stats.totalOrders}`);
console.log(`Total Revenue: $${stats.totalRevenue.toFixed(2)}`);
console.log(`Average Order Value: $${stats.averageOrderValue.toFixed(2)}`);
console.log(`Status Distribution:`, stats.statusDistribution);

console.log("\n" + "=" .repeat(70));
console.log("🔄 Order Status Updates:");
orderManager.updateOrderStatus(1, 'confirmed');
orderManager.updateOrderStatus(2, 'processing');
orderManager.updateOrderStatus(3, 'shipped');

orderManager.orders.forEach(order => {
    const formatted = OrderUtils.formatOrderForDisplay(order);
    console.log(`${formatted.orderNumber}: ${formatted.status} - ${formatted.totalAmount}`);
});

console.log("\n" + "=" .repeat(70));
console.log("📋 Customer Order History:");
const johnOrders = orderManager.getOrdersByCustomer(1);
console.log(`John Doe has ${johnOrders.length} orders:`);
johnOrders.forEach(order => {
    console.log(`  Order ${order.id}: $${order.totalAmount} (${order.status})`);
});

console.log("\n" + "=" .repeat(70));
console.log("💾 JSON Export/Import:");
const exportedData = orderManager.exportOrdersToJSON();
console.log("✅ Orders exported to JSON");
console.log(`Export size: ${exportedData.length} characters`);

// Test import
const newOrderManager = new OrderManager();
const importSuccess = newOrderManager.importOrdersFromJSON(exportedData);
console.log(`✅ Import successful: ${importSuccess}`);
console.log(`Imported ${newOrderManager.orders.length} orders`);

console.log("\n" + "=" .repeat(70));
console.log("📈 Advanced Analytics:");
const monthlyRevenue = OrderUtils.calculateMonthlyRevenue(orderManager.orders);
console.log("Monthly Revenue:", monthlyRevenue);

const ordersByDate = OrderUtils.groupOrdersByDate(orderManager.orders);
console.log("Orders by Date:", Object.keys(ordersByDate));

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OrderManager,
        OrderUtils,
        productCatalog
    };
}
