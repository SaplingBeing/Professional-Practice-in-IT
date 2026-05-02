const breakpoints = { sm: 360, md: 768, lg: 1024, xl: 1400 };

const propMap = {
    m: "margin", p: "padding",
    w: "width", h: "height",
    pos: "position",
    d: "display", z: "z-index",
    text: "color",
    decor: "text-decoration",
    bg: "background",
    font: "font-family",
    border: "border",
    align: "text-align",
    fsz: "font-size",
    fst: "font-style",
    fw: "font-weight",
    wrap: "text-wrap",
    ws: "white-space",
    cols: "grid-template-columns",
    rows: "grid-template-rows",
    col: "grid-column",
    row: "grid-row",
    gap: "gap",
    flex: "flex",
    justify: "justify-content",
    items: "align-items",
    content: "align-content",
    self: "align-self",
    overflow: "overflow",
    float: "float",
    top: "top",
    right: "right",
    bot: "bottom",
    left: "left",
    ratio: "aspect-ratio",
    border: "border",
    transform: "transform",
    cursor: "cursor",
    animate: "animation",
    trans: "transition",
};

const setStyle = (elem) => {
    return (property, value) => {
        const cssProp = propMap[property];
        if (!cssProp) return;

        if (value === null) {
            elem.style.removeProperty(cssProp);
        } else {
        
            elem.style.setProperty(cssProp, value, 'important');
        }
    }
};

const applyStyles = () => {
    const width = window.innerWidth;
    
    document.querySelectorAll('[class*="["]').forEach(el => {
        el.classList.forEach(cls => {
            if (!cls.includes('[') || !cls.includes(']')) return;

            let utility = cls;
            let isBreakpoint = false;
            let shouldApply = true;
        
            if (cls.includes(':')) {
                isBreakpoint = true;
                const [bp, prp] = cls.split(':');
                utility = prp;
                shouldApply = width >= (breakpoints[bp] || 0);
            }

            const [prop, rawVal] = utility.replace(']', '').split('-[');
            const val = rawVal.replace(/_/g, ' ');

            if (shouldApply) {
                setStyle(el)(prop, val);
            } else if (isBreakpoint) {
            
                setStyle(el)(prop, null);
            }
        });
    });
};

let timer;
const debouncedApply = () => {
    clearTimeout(timer);
    timer = setTimeout(applyStyles, 0.001);
};

window.addEventListener('DOMContentLoaded', applyStyles);
window.addEventListener('resize', debouncedApply);