// Firebase Sync Manager
// Handles real-time synchronization between desktop and mobile devices

import { db } from './firebase-config.js';
import {
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    collection,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

class FirebaseSync {
    constructor() {
        this.syncEnabled = true;
        this.listeners = [];
        this.isOnline = navigator.onLine;
        this.pendingWrites = [];

        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateSyncStatus('online');
            console.log('🌐 Back online - processing pending syncs');
            this.processPendingWrites();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateSyncStatus('offline');
            console.warn('📴 Offline - changes will sync when connection restored');
        });

        console.log('🔄 Firebase Sync Manager initialized');
    }

    // Sync hero image to cloud
    async syncHeroImage(imageData) {
        if (!this.syncEnabled) return;

        try {
            this.updateSyncStatus('syncing');

            await setDoc(doc(db, 'settings', 'heroImage'), {
                imagePath: imageData.imagePath || '',
                removeBackground: imageData.removeBackground || false,
                lastUpdate: serverTimestamp()
            });

            console.log('✅ Hero image synced to cloud');
            this.updateSyncStatus('synced');
        } catch (error) {
            console.error('❌ Hero image sync failed:', error);
            this.updateSyncStatus('error');
            // Fallback to localStorage only
        }
    }

    // Listen for hero image changes from cloud
    listenHeroImage(callback) {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'heroImage'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                const imageData = {
                    imagePath: data.imagePath,
                    removeBackground: data.removeBackground
                };

                // Update localStorage
                localStorage.setItem('ktmobile_hero_image', JSON.stringify(imageData));

                // Trigger callback
                if (callback) callback(imageData);

                console.log('📥 Hero image updated from cloud');
            }
        }, (error) => {
            console.error('❌ Hero image listener error:', error);
        });

        this.listeners.push(unsubscribe);
        return unsubscribe;
    }

    // Sync condition modifiers to cloud
    async syncConditionModifiers(modifiers) {
        if (!this.syncEnabled) return;

        try {
            this.updateSyncStatus('syncing');

            await setDoc(doc(db, 'settings', 'conditionModifiers'), {
                ...modifiers,
                lastUpdate: serverTimestamp()
            });

            console.log('✅ Condition modifiers synced to cloud');
            this.updateSyncStatus('synced');
        } catch (error) {
            console.error('❌ Condition modifiers sync failed:', error);
            this.updateSyncStatus('error');
        }
    }

    // Listen for condition modifier changes from cloud
    listenConditionModifiers(callback) {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'conditionModifiers'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                delete data.lastUpdate; // Remove metadata

                // Update localStorage
                localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(data));

                // Trigger callback
                if (callback) callback(data);

                console.log('📥 Condition modifiers updated from cloud');
            }
        }, (error) => {
            console.error('❌ Condition modifiers listener error:', error);
        });

        this.listeners.push(unsubscribe);
        return unsubscribe;
    }

    // Sync entire phone database to cloud
    async syncPriceDatabase(database) {
        if (!this.syncEnabled) return;

        try {
            this.updateSyncStatus('syncing');

            // Split large database into chunks if needed
            const dbData = {
                version: database.version || '1.0.0',
                lastUpdate: serverTimestamp(),
                phones: database.phones || [],
                conditionModifiers: database.conditionModifiers || {}
            };

            await setDoc(doc(db, 'settings', 'priceDatabase'), dbData);

            console.log('✅ Price database synced to cloud (' + (database.phones?.length || 0) + ' phones)');
            this.updateSyncStatus('synced');
        } catch (error) {
            console.error('❌ Price database sync failed:', error);
            this.updateSyncStatus('error');
        }
    }

    // Listen for price database changes from cloud
    listenPriceDatabase(callback) {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'priceDatabase'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();

                // Update localStorage
                localStorage.setItem('iboxmobile_price_database', JSON.stringify(data));

                // Trigger callback
                if (callback) callback(data);

                console.log('📥 Price database updated from cloud (' + (data.phones?.length || 0) + ' phones)');
            }
        }, (error) => {
            console.error('❌ Price database listener error:', error);
        });

        this.listeners.push(unsubscribe);
        return unsubscribe;
    }

    // Sync single appointment to cloud
    async syncAppointment(appointment) {
        if (!this.syncEnabled) return;

        try {
            this.updateSyncStatus('syncing');

            await setDoc(doc(db, 'appointments', appointment.id), {
                ...appointment,
                lastUpdate: serverTimestamp()
            });

            console.log('✅ Appointment synced to cloud:', appointment.id);
            this.updateSyncStatus('synced');
        } catch (error) {
            console.error('❌ Appointment sync failed:', error);
            this.updateSyncStatus('error');
        }
    }

    // Listen for all appointments from cloud
    listenAppointments(callback) {
        const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
            const appointments = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                delete data.lastUpdate; // Remove metadata
                appointments.push(data);
            });

            // Update localStorage
            localStorage.setItem('ktmobile_appointments', JSON.stringify(appointments));

            // Trigger callback
            if (callback) callback(appointments);

            console.log('📥 Appointments updated from cloud:', appointments.length);
        }, (error) => {
            console.error('❌ Appointments listener error:', error);
        });

        this.listeners.push(unsubscribe);
        return unsubscribe;
    }

    // Sync with retry logic for offline scenarios
    async syncWithRetry(syncFunction, data, maxRetries = 3) {
        if (!this.isOnline) {
            // Queue for later
            this.pendingWrites.push({ syncFunction, data });
            console.log('📴 Offline - queued for sync:', syncFunction.name);
            return;
        }

        let retries = 0;
        while (retries < maxRetries) {
            try {
                await syncFunction.call(this, data);
                return; // Success
            } catch (error) {
                retries++;
                if (retries >= maxRetries) {
                    console.error('❌ Sync failed after', maxRetries, 'retries:', error);
                    // Still save to localStorage as backup
                } else {
                    console.warn(`⚠️ Retry ${retries}/${maxRetries}...`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                }
            }
        }
    }

    // Process pending writes when coming back online
    async processPendingWrites() {
        if (this.pendingWrites.length === 0) return;

        console.log('🔄 Processing pending writes:', this.pendingWrites.length);
        const pending = [...this.pendingWrites];
        this.pendingWrites = [];

        for (const { syncFunction, data } of pending) {
            await this.syncWithRetry(syncFunction, data);
        }

        console.log('✅ All pending writes processed');
    }

    // Update sync status indicator in UI
    updateSyncStatus(status) {
        const statusEl = document.getElementById('sync-status');
        if (!statusEl) return;

        statusEl.className = `sync-status ${status}`;
        const statusText = statusEl.querySelector('.status-text');
        if (!statusText) return;

        switch(status) {
            case 'syncing':
                statusText.textContent = 'Syncing...';
                break;
            case 'offline':
                statusText.textContent = 'Offline';
                break;
            case 'error':
                statusText.textContent = 'Sync error';
                break;
            case 'online':
            case 'synced':
            default:
                statusText.textContent = 'Synced';
        }
    }

    // Load initial data from cloud (call on page load)
    async loadInitialData() {
        try {
            console.log('📥 Loading initial data from cloud...');

            // Load hero image
            const heroDoc = await getDoc(doc(db, 'settings', 'heroImage'));
            if (heroDoc.exists()) {
                const data = heroDoc.data();
                localStorage.setItem('ktmobile_hero_image', JSON.stringify({
                    imagePath: data.imagePath,
                    removeBackground: data.removeBackground
                }));
                console.log('✅ Hero image loaded from cloud');
            }

            // Load condition modifiers
            const modifiersDoc = await getDoc(doc(db, 'settings', 'conditionModifiers'));
            if (modifiersDoc.exists()) {
                const data = modifiersDoc.data();
                delete data.lastUpdate;
                localStorage.setItem('ktmobile_condition_modifiers', JSON.stringify(data));
                console.log('✅ Condition modifiers loaded from cloud');
            }

            // Load price database
            const priceDoc = await getDoc(doc(db, 'settings', 'priceDatabase'));
            if (priceDoc.exists()) {
                const data = priceDoc.data();
                localStorage.setItem('iboxmobile_price_database', JSON.stringify(data));
                console.log('✅ Price database loaded from cloud (' + (data.phones?.length || 0) + ' phones)');
            }

            console.log('✅ Initial data load complete');
        } catch (error) {
            console.error('❌ Initial data load failed:', error);
            console.log('⚠️ Using localStorage fallback');
        }
    }

    // Clean up all listeners
    unsubscribeAll() {
        console.log('🔌 Unsubscribing from', this.listeners.length, 'listeners');
        this.listeners.forEach(unsubscribe => unsubscribe());
        this.listeners = [];
    }

    // Enable/disable sync
    setEnabled(enabled) {
        this.syncEnabled = enabled;
        console.log(enabled ? '✅ Sync enabled' : '❌ Sync disabled');
    }
}

// Create global instance
window.firebaseSync = new FirebaseSync();

// Load initial data on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.firebaseSync.loadInitialData();
    });
} else {
    window.firebaseSync.loadInitialData();
}

console.log('✅ Firebase Sync Manager ready');

export default window.firebaseSync;
