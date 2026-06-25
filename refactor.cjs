const fs = require('fs');

const cssMapping = {
    'className="admin-table-controls"': 'className="flex justify-between items-center gap-4 mb-6 flex-wrap"',
    'className="admin-search-box"': 'className="relative max-w-[350px] w-full"',
    'className="admin-search-icon"': 'className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 text-text-dim"',
    'className="admin-table-container"': 'className="bg-slate/40 border border-white/5 rounded-xl overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.15)] overflow-x-auto"',
    'className="admin-table"': 'className="w-full border-collapse text-left min-w-[800px] [&_th]:p-[1.2rem_1.5rem] [&_th]:bg-midnight/60 [&_th]:text-text-dim [&_th]:text-[0.8rem] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.05em] [&_th]:border-b [&_th]:border-white/10 [&_td]:p-[1.2rem_1.5rem] [&_td]:border-b [&_td]:border-white/5 [&_td]:text-[0.9rem] [&_td]:text-text-main [&_tbody_tr:hover_td]:bg-white/5 [&_tbody_tr:last-child_td]:border-none"',
    'className="admin-user-cell"': 'className="flex items-center gap-4"',
    'className="admin-user-cell-avatar"': 'className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-[1.2rem]"',
    'className="admin-user-cell-info"': 'className="flex flex-col"',
    'className="admin-user-cell-name"': 'className="font-semibold text-white"',
    'className="admin-user-cell-email"': 'className="text-[0.8rem] text-text-dim"',
    'className="admin-actions-cell"': 'className="flex items-center gap-2"',
    'className="admin-modal-overlay"': 'className="fixed inset-0 bg-midnight/80 backdrop-blur-[4px] z-[200] flex items-center justify-center p-4"',
    'className="admin-modal"': 'className="bg-slate border border-white/10 border-t-[3px] border-t-gold rounded-xl w-full max-w-[500px] max-h-[90vh] flex flex-col shadow-[0_25px_50px_rgba(0,0,0,0.5)] animate-[modalFadeIn_0.3s_ease_forwards]"',
    'className="admin-modal-header"': 'className="p-6 border-b border-white/5 flex items-center justify-between [&_h2]:text-[1.25rem] [&_h2]:font-semibold [&_h2]:text-white"',
    'className="admin-modal-close"': 'className="bg-transparent border-none text-text-dim cursor-pointer transition-colors duration-200 flex items-center justify-center hover:text-white"',
    'className="admin-modal-body"': 'className="p-6 overflow-y-auto"',
    'className="admin-modal-footer"': 'className="p-6 border-t border-white/5 flex justify-end gap-4"',
    'className="admin-btn-secondary"': 'className="py-[0.7rem] px-[1.5rem] bg-white/5 border border-white/10 rounded-lg text-white text-[0.95rem] font-medium cursor-pointer transition-all duration-200 hover:bg-white/10"',
    'className="admin-btn-primary small"': 'className="py-[0.7rem] px-[1.5rem] bg-gradient-to-br from-gold to-gold-bright border-none rounded-lg text-midnight text-[0.95rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(201,169,98,0.3)] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(201,169,98,0.5)] hover:from-gold-bright hover:to-gold active:translate-y-0 w-auto"',
    'className="admin-btn-primary"': 'className="w-full p-3 bg-gradient-to-br from-gold to-gold-bright border-none rounded-lg text-midnight text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(201,169,98,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,169,98,0.5)] hover:from-gold-bright hover:to-gold active:translate-y-0"',
    'className="admin-form-group"': 'className="mb-6 text-left [&_label]:block [&_label]:text-[0.85rem] [&_label]:font-semibold [&_label]:text-text-dim [&_label]:mb-2 [&_label]:uppercase [&_label]:tracking-[0.05em] [&_textarea]:w-full [&_textarea]:p-[0.8rem_1rem] [&_textarea]:min-h-[120px] [&_textarea]:resize-y [&_textarea]:bg-slate/40 [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:rounded-lg [&_textarea]:text-white [&_textarea]:text-[0.95rem] [&_textarea]:transition-all [&_textarea]:duration-300 focus:[&_textarea]:outline-none focus:[&_textarea]:border-gold focus:[&_textarea]:bg-slate/80 focus:[&_textarea]:shadow-[0_0_10px_rgba(201,169,98,0.15)]"',
    'className="admin-input-wrapper"': 'className="relative flex items-center"',
    'className="admin-input-icon"': 'className="absolute left-4 text-text-dim pointer-events-none"',
    'className="admin-action-btn"': 'className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-text-dim cursor-pointer transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20"',
    'className="admin-action-btn danger"': 'className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-text-dim cursor-pointer transition-all duration-200 hover:bg-[#ef444426] hover:text-[#ef4444] hover:border-[#ef44444d]"',
};

const inputClassStr = 'className="w-full py-[0.7rem] pr-4 pl-[2.6rem] bg-slate/40 border border-white/10 rounded-lg text-white text-[0.9rem] focus:outline-none focus:border-gold focus:bg-slate/80"';
const selectClassStr = 'className="py-[0.7rem] pr-10 pl-4 bg-slate/40 border border-white/10 rounded-lg text-white text-[0.9rem] cursor-pointer min-w-[150px] appearance-none focus:outline-none focus:border-gold"';

const files = fs.readdirSync('src/components').filter(f => f.endsWith('Tab.tsx') && f !== 'DashboardTab.tsx');

files.forEach(file => {
    let content = fs.readFileSync(`src/components/${file}`, 'utf-8');
    
    // simple replacements
    for (const [oldClass, newClass] of Object.entries(cssMapping)) {
        content = content.split(oldClass).join(newClass);
    }
    
    // Inputs inside admin-search-box
    content = content.replace(/<input\s+type="text"\s+placeholder="Search/g, `<input ${inputClassStr} type="text" placeholder="Search`);
    
    // Selects for filter
    content = content.replace(/<select\s+className="admin-filter-select"/g, `<select ${selectClassStr}`);
    content = content.replace(/<select\s+value=\{filter\}/g, `<select ${selectClassStr} value={filter}`);
    content = content.replace(/<select\s+value=\{statusFilter\}/g, `<select ${selectClassStr} value={statusFilter}`);
    content = content.replace(/<select\s+value=\{roleFilter\}/g, `<select ${selectClassStr} value={roleFilter}`);
    
    // Modal Inputs
    content = content.replace(/<input\s+type="text"\s+value=/g, `<input className="w-full py-[0.8rem] pr-4 pl-4 bg-slate/40 border border-white/10 rounded-lg text-white text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-slate/80 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]" type="text" value=`);
    content = content.replace(/<input\s+type="date"/g, `<input className="w-full py-[0.8rem] pr-4 pl-4 bg-slate/40 border border-white/10 rounded-lg text-white text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-slate/80 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]" type="date"`);
    content = content.replace(/<input\s+type="time"/g, `<input className="w-full py-[0.8rem] pr-4 pl-4 bg-slate/40 border border-white/10 rounded-lg text-white text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-slate/80 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]" type="time"`);
    content = content.replace(/<input\s+type="number"/g, `<input className="w-full py-[0.8rem] pr-4 pl-4 bg-slate/40 border border-white/10 rounded-lg text-white text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-slate/80 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]" type="number"`);
    
    // Status badges
    content = content.replace(/className=\{`admin-status-badge admin-status-\$\{([^}]+)\}`\}/g, 'className={`inline-flex items-center py-[0.3rem] px-[0.8rem] rounded-full text-[0.75rem] font-semibold uppercase tracking-[0.05em] ${$1 === "Active" || $1 === "Approved" || $1 === "Resolved" || $1 === "Published" ? "bg-[#34d39926] text-[#34d399]" : $1 === "Suspended" || $1 === "Rejected" || $1 === "Cancelled" ? "bg-[#ef444426] text-[#ef4444]" : "bg-[#f59e0b26] text-[#f59e0b]"}`}');
    content = content.replace(/className=\{`admin-status-badge admin-status-\$\{([^}]+)\.toLowerCase\(\)\}`\}/g, 'className={`inline-flex items-center py-[0.3rem] px-[0.8rem] rounded-full text-[0.75rem] font-semibold uppercase tracking-[0.05em] ${$1.toLowerCase() === "active" || $1.toLowerCase() === "approved" || $1.toLowerCase() === "resolved" || $1.toLowerCase() === "published" ? "bg-[#34d39926] text-[#34d399]" : $1.toLowerCase() === "suspended" || $1.toLowerCase() === "rejected" || $1.toLowerCase() === "cancelled" ? "bg-[#ef444426] text-[#ef4444]" : "bg-[#f59e0b26] text-[#f59e0b]"}`}');

    fs.writeFileSync(`src/components/${file}`, content, 'utf-8');
});

console.log("Done");
