/**
 * Automated Background Removal Tool
 * Removes white/light backgrounds from images automatically
 */

class BackgroundRemover {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    /**
     * Initialize canvas for image processing
     */
    initCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
        }
    }

    /**
     * Remove white/light background from image
     * @param {string} imageSrc - Image source (URL or data URL)
     * @param {Object} options - Processing options
     * @returns {Promise<string>} - Processed image as data URL
     */
    async removeBackground(imageSrc, options = {}) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    this.initCanvas();
                    
                    // Set canvas size
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    
                    // Draw image
                    this.ctx.drawImage(img, 0, 0);
                    
                    // Get image data
                    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    const data = imageData.data;
                    
                    // Threshold for white/light colors (adjustable)
                    const threshold = options.threshold || 240; // 0-255, higher = more aggressive
                    const tolerance = options.tolerance || 30; // Color tolerance
                    
                    // Process each pixel
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const a = data[i + 3];
                        
                        // Calculate brightness
                        const brightness = (r + g + b) / 3;
                        
                        // Check if pixel is white/light
                        const isWhite = brightness >= threshold && 
                                       Math.abs(r - g) < tolerance && 
                                       Math.abs(g - b) < tolerance &&
                                       Math.abs(r - b) < tolerance;
                        
                        // Make white/light pixels transparent
                        if (isWhite) {
                            data[i + 3] = 0; // Set alpha to 0 (transparent)
                        }
                    }
                    
                    // Put processed data back
                    this.ctx.putImageData(imageData, 0, 0);
                    
                    // Convert to data URL
                    const processedImageUrl = this.canvas.toDataURL('image/png');
                    resolve(processedImageUrl);
                } catch (error) {
                    console.error('Error processing image:', error);
                    reject(error);
                }
            };
            
            img.onerror = (error) => {
                reject(new Error('Failed to load image'));
            };
            
            img.src = imageSrc;
        });
    }

    /**
     * Remove background with advanced edge detection
     * Better for images with complex backgrounds
     */
    async removeBackgroundAdvanced(imageSrc, options = {}) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    this.initCanvas();
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);
                    
                    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    const data = imageData.data;
                    
                    const threshold = options.threshold || 220;
                    const edgeThreshold = options.edgeThreshold || 15;
                    
                    // First pass: identify white/light pixels
                    const whitePixels = new Set();
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const brightness = (r + g + b) / 3;
                        
                        if (brightness >= threshold) {
                            whitePixels.add(i / 4);
                        }
                    }
                    
                    // Second pass: edge detection and removal
                    for (let y = 1; y < this.canvas.height - 1; y++) {
                        for (let x = 1; x < this.canvas.width - 1; x++) {
                            const idx = (y * this.canvas.width + x) * 4;
                            const pixelIdx = idx / 4;
                            
                            if (whitePixels.has(pixelIdx)) {
                                // Check neighbors for edges
                                const neighbors = [
                                    ((y - 1) * this.canvas.width + x) * 4,
                                    ((y + 1) * this.canvas.width + x) * 4,
                                    (y * this.canvas.width + (x - 1)) * 4,
                                    (y * this.canvas.width + (x + 1)) * 4
                                ];
                                
                                let hasDarkNeighbor = false;
                                for (const nIdx of neighbors) {
                                    const nr = data[nIdx];
                                    const ng = data[nIdx + 1];
                                    const nb = data[nIdx + 2];
                                    const nbrightness = (nr + ng + nb) / 3;
                                    
                                    if (nbrightness < threshold - edgeThreshold) {
                                        hasDarkNeighbor = true;
                                        break;
                                    }
                                }
                                
                                // Remove white pixels, but preserve edges
                                if (!hasDarkNeighbor) {
                                    data[idx + 3] = 0; // Transparent
                                } else {
                                    // Edge pixel - make semi-transparent for smooth transition
                                    data[idx + 3] = Math.min(data[idx + 3], 100);
                                }
                            }
                        }
                    }
                    
                    this.ctx.putImageData(imageData, 0, 0);
                    const processedImageUrl = this.canvas.toDataURL('image/png');
                    resolve(processedImageUrl);
                } catch (error) {
                    console.error('Error in advanced processing:', error);
                    reject(error);
                }
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = imageSrc;
        });
    }

    /**
     * Auto-detect best removal method and process
     */
    async autoRemoveBackground(imageSrc) {
        try {
            // Try advanced method first
            return await this.removeBackgroundAdvanced(imageSrc, {
                threshold: 220,
                edgeThreshold: 20
            });
        } catch (error) {
            console.warn('Advanced removal failed, trying basic method:', error);
            // Fallback to basic method
            return await this.removeBackground(imageSrc, {
                threshold: 240,
                tolerance: 30
            });
        }
    }
}

// Create global instance
const backgroundRemover = new BackgroundRemover();

// Export
if (typeof window !== 'undefined') {
    window.BackgroundRemover = BackgroundRemover;
    window.backgroundRemover = backgroundRemover;
}
