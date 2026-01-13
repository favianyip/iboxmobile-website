/**
 * Authentication System for KT Mobile Singapore
 * Handles customer and admin login
 */

// ============================================================================
// USER DATABASE (In production, this would be on a server)
// ============================================================================

// Permission Types
const PERMISSION_TYPES = {
    MASTER_ADMIN: 'master_admin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer'
};

// Permission Definitions
const PERMISSIONS = {
    [PERMISSION_TYPES.MASTER_ADMIN]: {
        name: 'Master Admin',
        description: 'Full access including user management',
        canManageUsers: true,
        canManagePhones: true,
        canManagePrices: true,
        canManageBrands: true,
        canManageSettings: true,
        canDelete: true
    },
    [PERMISSION_TYPES.ADMIN]: {
        name: 'Admin',
        description: 'Full access except user management',
        canManageUsers: false,
        canManagePhones: true,
        canManagePrices: true,
        canManageBrands: true,
        canManageSettings: true,
        canDelete: true
    },
    [PERMISSION_TYPES.EDITOR]: {
        name: 'Editor',
        description: 'Can edit phones and prices, cannot delete',
        canManageUsers: false,
        canManagePhones: true,
        canManagePrices: true,
        canManageBrands: false,
        canManageSettings: false,
        canDelete: false
    },
    [PERMISSION_TYPES.VIEWER]: {
        name: 'Viewer',
        description: 'Read-only access',
        canManageUsers: false,
        canManagePhones: false,
        canManagePrices: false,
        canManageBrands: false,
        canManageSettings: false,
        canDelete: false
    }
};

const usersDatabase = {
    // Master Admin account
    master_admin: {
        email: 'master@ktmobile.sg',
        password: 'master123', // In production, use hashed passwords
        role: 'admin',
        permissionType: PERMISSION_TYPES.MASTER_ADMIN,
        name: 'Master Admin',
        createdAt: new Date().toISOString()
    },
    
    // Regular Admin account
    admin: {
        email: 'admin',
        password: 'admin123',
        role: 'admin',
        permissionType: PERMISSION_TYPES.ADMIN,
        name: 'Admin User',
        createdAt: new Date().toISOString()
    },
    
    // Customer accounts (demo)
    customer1: {
        email: 'customer@example.com',
        password: 'customer123',
        role: 'customer',
        permissionType: null,
        name: 'John Doe',
        createdAt: new Date().toISOString()
    }
};

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

class AuthSystem {
    constructor() {
        this.currentUser = this.getStoredUser();
        this.userType = 'customer'; // Default user type
    }

    /**
     * Login user
     */
    login(email, password, userType) {
        // Load users from localStorage if available
        const storedUsers = this.loadUsers();
        const allUsers = { ...usersDatabase, ...storedUsers };
        
        // Find user in database
        const user = Object.values(allUsers).find(u => 
            u.email === email && u.role === userType
        );

        if (!user) {
            return { success: false, message: 'Invalid email or user type' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Invalid password' };
        }

        // Store user session
        this.currentUser = {
            email: user.email,
            role: user.role,
            permissionType: user.permissionType,
            name: user.name,
            id: user.id || Object.keys(allUsers).find(key => allUsers[key].email === email)
        };

        localStorage.setItem('ktmobile_user', JSON.stringify(this.currentUser));
        localStorage.setItem('ktmobile_token', this.generateToken());

        return { success: true, user: this.currentUser };
    }

    /**
     * Load users from localStorage
     */
    loadUsers() {
        const stored = localStorage.getItem('ktmobile_users');
        return stored ? JSON.parse(stored) : {};
    }

    /**
     * Save users to localStorage
     */
    saveUsers(users) {
        localStorage.setItem('ktmobile_users', JSON.stringify(users));
    }

    /**
     * Check if user has permission
     */
    hasPermission(permission) {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            return false;
        }

        const permissionType = this.currentUser.permissionType || PERMISSION_TYPES.ADMIN;
        const userPermissions = PERMISSIONS[permissionType];
        
        return userPermissions && userPermissions[permission] === true;
    }

    /**
     * Check if user is master admin
     */
    isMasterAdmin() {
        return this.hasPermission('canManageUsers');
    }

    /**
     * Logout user
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem('ktmobile_user');
        localStorage.removeItem('ktmobile_token');
        window.location.href = 'login.html';
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    /**
     * Create new admin user
     */
    createAdmin(email, password, name, permissionType) {
        // Check if current user can manage users
        if (!this.isMasterAdmin()) {
            return { success: false, message: 'Permission denied. Only Master Admin can create users.' };
        }

        // Load existing users
        const users = this.loadUsers();
        
        // Check if email already exists
        const allUsers = { ...usersDatabase, ...users };
        const exists = Object.values(allUsers).find(u => u.email === email);
        if (exists) {
            return { success: false, message: 'Email already registered' };
        }

        // Validate permission type
        if (!PERMISSIONS[permissionType]) {
            return { success: false, message: 'Invalid permission type' };
        }

        // Create new admin
        const newAdmin = {
            id: 'admin_' + Date.now(),
            email: email,
            password: password, // Should be hashed in production
            role: 'admin',
            permissionType: permissionType,
            name: name,
            createdAt: new Date().toISOString(),
            createdBy: this.currentUser.email
        };

        users[newAdmin.id] = newAdmin;
        this.saveUsers(users);

        return { success: true, user: newAdmin };
    }

    /**
     * Update admin user
     */
    updateAdmin(adminId, updates) {
        if (!this.isMasterAdmin()) {
            return { success: false, message: 'Permission denied' };
        }

        const users = this.loadUsers();
        if (!users[adminId]) {
            return { success: false, message: 'User not found' };
        }

        users[adminId] = {
            ...users[adminId],
            ...updates,
            updatedAt: new Date().toISOString(),
            updatedBy: this.currentUser.email
        };

        this.saveUsers(users);
        return { success: true, user: users[adminId] };
    }

    /**
     * Delete admin user
     */
    deleteAdmin(adminId) {
        if (!this.isMasterAdmin()) {
            return { success: false, message: 'Permission denied' };
        }

        // Prevent deleting master admin
        if (usersDatabase[adminId] && usersDatabase[adminId].permissionType === PERMISSION_TYPES.MASTER_ADMIN) {
            return { success: false, message: 'Cannot delete Master Admin account' };
        }

        // Prevent deleting yourself
        if (this.currentUser.id === adminId) {
            return { success: false, message: 'Cannot delete your own account' };
        }

        const users = this.loadUsers();
        if (!users[adminId]) {
            return { success: false, message: 'User not found' };
        }

        delete users[adminId];
        this.saveUsers(users);

        return { success: true };
    }

    /**
     * Get all admin users
     */
    getAllAdmins() {
        if (!this.isMasterAdmin()) {
            return [];
        }

        const storedUsers = this.loadUsers();
        const allUsers = { ...usersDatabase, ...storedUsers };
        
        return Object.entries(allUsers)
            .filter(([id, user]) => user.role === 'admin')
            .map(([id, user]) => ({ id, ...user }));
    }

    /**
     * Get stored user from localStorage
     */
    getStoredUser() {
        const stored = localStorage.getItem('ktmobile_user');
        return stored ? JSON.parse(stored) : null;
    }

    /**
     * Generate simple token (in production, use JWT)
     */
    generateToken() {
        return btoa(JSON.stringify({
            email: this.currentUser.email,
            role: this.currentUser.role,
            timestamp: Date.now()
        }));
    }

    /**
     * Register new customer
     */
    register(email, password, name) {
        // Check if email already exists
        const exists = Object.values(usersDatabase).find(u => u.email === email);
        if (exists) {
            return { success: false, message: 'Email already registered' };
        }

        // In production, this would be saved to server
        const newUser = {
            email,
            password, // Should be hashed
            role: 'customer',
            name
        };

        // For demo, just add to local object
        const userId = 'customer' + Date.now();
        usersDatabase[userId] = newUser;

        return { success: true, message: 'Registration successful' };
    }
}

// ============================================================================
// INITIALIZE AUTH SYSTEM
// ============================================================================

const auth = new AuthSystem();

// ============================================================================
// LOGIN PAGE HANDLERS
// ============================================================================

if (document.getElementById('loginForm')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('loginForm');
        const userTypeBtns = document.querySelectorAll('.user-type-btn');
        const errorMessage = document.getElementById('errorMessage');

        // Set default userType to admin for admin-only login page
        auth.userType = 'admin';

        // User type selection (if buttons exist)
        userTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                userTypeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                auth.userType = this.dataset.type;
            });
        });

        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Validate
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }

            // Since this is admin-only login page, try admin first
            let userType = auth.userType || 'admin';
            let result = auth.login(email, password, userType);
            
            // If admin login fails, try customer (for backward compatibility)
            if (!result.success && userType === 'admin') {
                result = auth.login(email, password, 'customer');
            }

            if (result.success) {
                // Redirect based on role
                if (result.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                showError(result.message || 'Invalid credentials. Please check your username and password.');
            }
        });

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }

        // Register link
        document.getElementById('registerLink')?.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Registration feature coming soon! For demo, use:\nEmail: customer@example.com\nPassword: customer123');
        });

        // Forgot password link
        document.getElementById('forgotPasswordLink')?.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset feature coming soon!');
        });
    });
}

// ============================================================================
// PROTECT ADMIN PAGES
// ============================================================================

if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
            alert('Access denied. Admin login required.');
            window.location.href = 'login.html';
        }
    });
}

// ============================================================================
// EXPORT
// ============================================================================

window.auth = auth;
window.PERMISSION_TYPES = PERMISSION_TYPES;
window.PERMISSIONS = PERMISSIONS;
