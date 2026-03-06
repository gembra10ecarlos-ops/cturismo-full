
import React, { useState, useRef } from 'react';
import { AppScreen, Customer } from '../types';
import { Search, Download, Filter, UserCheck, Trash2, PieChart, TrendingUp, Users, Upload, FileText, Edit2, X, Check, FileDown, CheckSquare, Square } from 'lucide-react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfjsLib from 'pdfjs-dist';
import { Logo } from '../App';

// Configuração do worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface AdminProps {
  customers: Customer[];
  onNavigate: (s: AppScreen) => void;
  onDeleteCustomer: (id: string) => void;
  onUpdateCustomer: (customer: Customer) => void;
  onBulkAdd: (customers: Omit<Customer, 'id' | 'createdAt' | 'status' | 'source'>[]) => void;
}

const Admin: React.FC<AdminProps> = ({ customers, onNavigate, onDeleteCustomer, onUpdateCustomer, onBulkAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'report'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Customer | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(c => c.id)));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws) as any[];
        
        const newCustomers = data.map(item => ({
          name: item.Nome || item.name || '',
          email: item.Email || item.email || '',
          login: item.Login || item.login || '',
          cpf: item.CPF || item.cpf || '',
          cnpj: item.CNPJ || item.cnpj || ''
        }));
        onBulkAdd(newCustomers);
      };
      reader.readAsBinaryString(file);
    } else if (fileName.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        alert('Arquivo Word processado. Importando dados encontrados...');
        const lines = text.split('\n').filter(l => l.trim().includes('@'));
        const newCustomers = lines.map(line => ({
          name: line.split(' ')[0] || 'Importado Word',
          email: line.trim(),
          login: line.split('@')[0],
          cpf: '',
          cnpj: ''
        }));
        onBulkAdd(newCustomers);
      };
      reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const typedarray = new Uint8Array(evt.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map((item: any) => item.str).join(' ');
        }
        alert('Arquivo PDF processado. Importando dados encontrados...');
        const emails = fullText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [];
        const newCustomers = emails.map(email => ({
          name: 'Importado PDF',
          email: email,
          login: email.split('@')[0],
          cpf: '',
          cnpj: ''
        }));
        onBulkAdd(newCustomers);
      };
      reader.readAsArrayBuffer(file);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditForm({ ...customer });
  };

  const saveEdit = () => {
    if (editForm) {
      onUpdateCustomer(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const downloadExcel = (type: 'all' | 'selected') => {
    const dataToExport = type === 'all' ? customers : customers.filter(c => selectedIds.has(c.id));
    if (dataToExport.length === 0) return alert('Nenhum cliente selecionado');
    
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, `clientes-${type}-${new Date().getTime()}.xlsx`);
  };

  const downloadPDFReport = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('relatorio-clientes-cturismo.pdf');
  };

  const downloadWordReport = () => {
    const selectedCustomers = customers.filter(c => selectedIds.has(c.id));
    if (selectedCustomers.length === 0) return alert('Nenhum cliente selecionado');

    let content = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #008940; text-align: center;">C TURISMO</h1>
        <h2 style="text-align: center;">Lista de Passageiros para Viagem</h2>
        <p style="text-align: right;">Data: ${new Date().toLocaleDateString()}</p>
        <hr/>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Nome</th>
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Documento</th>
              <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Email</th>
            </tr>
          </thead>
          <tbody>
            ${selectedCustomers.map(c => `
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 8px;">${c.name}</td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">${c.cpf || c.cnpj || '-'}</td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">${c.email}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="margin-top: 30px; font-size: 10px; color: #6c757d; text-align: center;">Documento gerado pelo sistema C Turismo</p>
      </div>
    `;

    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lista-viagem-cturismo.doc';
    link.click();
  };

  const StatsCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
          <p className="text-slate-500">Gerencie clientes e selecione passageiros para viagem.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".xlsx,.xls,.docx,.pdf" />
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            <Upload size={18} /> Importar (Excel/Word/PDF)
          </button>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setView('list')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500'}`}>Lista</button>
            <button onClick={() => setView('report')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'report' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500'}`}>Relatórios / Viagem</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total de Clientes" value={customers.length} icon={Users} color="bg-blue-500" />
        <StatsCard title="Selecionados para Viagem" value={selectedIds.size} icon={CheckSquare} color="bg-green-500" />
        <StatsCard title="Taxa de Retenção" value="94%" icon={PieChart} color="bg-orange-500" />
      </div>

      {view === 'list' ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => downloadExcel('all')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
              <FileDown size={16} /> Baixar Todos (Excel)
            </button>
            <button onClick={() => downloadExcel('selected')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all">
              <FileDown size={16} /> Baixar Selecionados (Excel)
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Pesquisar por nome, email ou login..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <button onClick={toggleSelectAll} className="text-slate-400 hover:text-green-600 transition-colors">
                        {selectedIds.size === filtered.length && filtered.length > 0 ? <CheckSquare size={20} /> : <Square size={20} />}
                      </button>
                    </th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Identificação</th>
                    <th className="px-6 py-4">Origem</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((customer) => (
                    <tr key={customer.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedIds.has(customer.id) ? 'bg-green-50/30' : ''}`}>
                      <td className="px-6 py-5">
                        <button onClick={() => toggleSelect(customer.id)} className={`transition-colors ${selectedIds.has(customer.id) ? 'text-green-600' : 'text-slate-300 hover:text-slate-400'}`}>
                          {selectedIds.has(customer.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        {editingId === customer.id ? (
                          <input className="w-full p-2 border rounded-lg" value={editForm?.name} onChange={e => setEditForm({...editForm!, name: e.target.value})} />
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">{customer.name.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-slate-800">{customer.name}</p>
                              <p className="text-xs text-slate-400">@{customer.login} • {customer.email}</p>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {editingId === customer.id ? (
                          <div className="space-y-1">
                            <input placeholder="CPF" className="w-full p-1 text-xs border rounded" value={editForm?.cpf} onChange={e => setEditForm({...editForm!, cpf: e.target.value})} />
                            <input placeholder="CNPJ" className="w-full p-1 text-xs border rounded" value={editForm?.cnpj} onChange={e => setEditForm({...editForm!, cnpj: e.target.value})} />
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-slate-600">{customer.cpf ? `CPF: ${customer.cpf}` : `CNPJ: ${customer.cnpj}`}</p>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${customer.source === 'import' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                          {customer.source === 'import' ? 'IMPORTADO' : 'SITE'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {editingId === customer.id ? (
                          <select className="p-1 border rounded text-xs" value={editForm?.status} onChange={e => setEditForm({...editForm!, status: e.target.value as any})}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${customer.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{customer.status}</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {editingId === customer.id ? (
                            <>
                              <button onClick={saveEdit} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Check size={18} /></button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><X size={18} /></button>
                            </>
                          ) : (
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(customer)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar"><Edit2 size={18} /></button>
                              <button onClick={() => onDeleteCustomer(customer.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Excluir"><Trash2 size={18} /></button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <button onClick={downloadWordReport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
              <FileText size={18} /> Baixar Word
            </button>
            <button onClick={downloadPDFReport} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg hover:bg-green-700 transition-all">
              <Download size={20} /> Baixar Lista de Viagem (PDF)
            </button>
          </div>
          <div ref={reportRef} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-12 border-b pb-8">
              <div className="flex items-center gap-4">
                <Logo size="md" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">C Turismo</h2>
                  <p className="text-slate-500 text-sm">Lista de Passageiros Selecionados</p>
                </div>
              </div>
              <div className="text-right text-slate-400 text-sm">
                Gerado em: {new Date().toLocaleDateString()}<br />
                Passageiros: {selectedIds.size} de {customers.length}
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-400 uppercase text-[10px] font-bold">
                  <th className="py-4">Nome do Passageiro</th>
                  <th className="py-4">Documento (CPF/CNPJ)</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.filter(c => selectedIds.has(c.id)).length > 0 ? (
                  customers.filter(c => selectedIds.has(c.id)).map(c => (
                    <tr key={c.id}>
                      <td className="py-4 font-bold text-slate-700">{c.name}</td>
                      <td className="py-4 text-slate-500">{c.cpf || c.cnpj || '-'}</td>
                      <td className="py-4 text-slate-500">{c.email}</td>
                      <td className="py-4"><span className="text-green-600 font-bold">CONFIRMADO</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 italic">Nenhum passageiro selecionado para esta viagem.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-12 pt-8 border-t text-center text-slate-300 text-xs">
              Documento oficial C Turismo - Reservado para controle interno de viagens.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
