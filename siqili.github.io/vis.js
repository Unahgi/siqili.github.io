// SVG Art Visualizations
const svg = document.getElementById('vis');

// Clear any existing content
svg.innerHTML = '';

// Set SVG dimensions
svg.setAttribute('width', '800');
svg.setAttribute('height', '500');
svg.setAttribute('viewBox', '0 0 800 500');

// Art 1: Arc Pattern
function createArcPattern() {
    const artGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    artGroup.setAttribute('id', 'arc-pattern');
    
    const patternWidth = 40;
    const patternHeight = 60;
    const cols = Math.floor(800 / patternWidth);
    const rows = Math.floor(250 / patternHeight);
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * patternWidth;
            const y = row * patternHeight;
            
            // Create nested arcs
            for (let i = 0; i < 4; i++) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const radius = 15 - i * 3;
                const strokeWidth = 1.5;
                
                // Create arc path
                const startX = x + patternWidth/2 - radius;
                const startY = y + patternHeight;
                const endX = x + patternWidth/2 + radius;
                const endY = y + patternHeight;
                const centerX = x + patternWidth/2;
                const centerY = y + patternHeight;
                
                const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
                
                path.setAttribute('d', pathData);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', '#333');
                path.setAttribute('stroke-width', strokeWidth);
                
                artGroup.appendChild(path);
            }
            
            // Add vertical lines
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x + patternWidth/2);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x + patternWidth/2);
            line.setAttribute('y2', y + patternHeight);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', '1.5');
            
            artGroup.appendChild(line);
        }
    }
    
    return artGroup;
}

// Art 2: Geometric Line Art 
function createGeometricArt() {
    const artGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    artGroup.setAttribute('id', 'geometric-art');
    artGroup.setAttribute('transform', 'translate(0, 260)');
    
    const centerX = 400;
    const centerY = 120;
    const size = 80;
    
    // Create hexagonal shape with line patterns
    const sides = 6;
    const angleStep = (Math.PI * 2) / sides;
    
    for (let side = 0; side < sides; side++) {
        const angle1 = side * angleStep;
        const angle2 = (side + 1) * angleStep;
        
        const x1 = centerX + Math.cos(angle1) * size;
        const y1 = centerY + Math.sin(angle1) * size;
        const x2 = centerX + Math.cos(angle2) * size;
        const y2 = centerY + Math.sin(angle2) * size;
        
        // Create the main hexagon outline
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#333');
        line.setAttribute('stroke-width', '2');
        
        artGroup.appendChild(line);
        
        // Create parallel lines within each side
        const numLines = 20;
        for (let i = 1; i < numLines; i++) {
            const ratio = i / numLines;
            
            // Calculate parallel line positions
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            
            const dirX = (x2 - x1) * ratio;
            const dirY = (y2 - y1) * ratio;
            
            const perpX = -(y2 - y1) / Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)) * (i * 2);
            const perpY = (x2 - x1) / Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)) * (i * 2);
            
            const lineStart = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineStart.setAttribute('x1', x1 + dirX + perpX);
            lineStart.setAttribute('y1', y1 + dirY + perpY);
            lineStart.setAttribute('x2', x1 + dirX - perpX);
            lineStart.setAttribute('y2', y1 + dirY - perpY);
            lineStart.setAttribute('stroke', '#666');
            lineStart.setAttribute('stroke-width', '0.8');
            lineStart.setAttribute('opacity', 1 - ratio * 0.5);
            
            artGroup.appendChild(lineStart);
        }
    }
    
    return artGroup;
}

// Create and append both artworks
svg.appendChild(createArcPattern());
svg.appendChild(createGeometricArt());
