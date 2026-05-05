import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { getAllPlans, createPlan, updatePlan, deletePlan } from '../api/api';
import { MdEdit, MdDelete, MdAdd, MdSave, MdClose } from 'react-icons/md';

const CATEGORIES = [
  { key: 'featured', label: 'Featured Plans (Home)' },
  { key: 'gujarat_fup', label: 'Gujarat FUP Plans' },
  { key: 'gujarat_unlimited', label: 'Gujarat Unlimited' },
  { key: 'gujarat_msme', label: 'MSME Plans' },
];

const emptyForm = {
  speed: '', title: '', afterFup: '', data: '',
  priceMonth: '', priceThree: '', priceSix: '', priceTen: '',
  features: '',
};

function PlanRow({ plan, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3 font-semibold text-blue-700">{plan.speed}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{plan.title || '—'}</td>
      <td className="px-4 py-3 font-bold text-red-600">₹{plan.priceMonth}</td>
      {plan.afterFup && <td className="px-4 py-3 text-xs text-gray-500">{plan.afterFup} after FUP</td>}
      {plan.data && <td className="px-4 py-3 text-xs text-gray-500">{plan.data}</td>}
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full ${plan.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {plan.isActive ? 'Active' : 'Hidden'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(plan)} className="p-1.5 rounded hover:bg-blue-50 text-blue-500">
            <MdEdit size={16} />
          </button>
          <button onClick={() => onDelete(plan._id)} className="p-1.5 rounded hover:bg-red-50 text-red-500">
            <MdDelete size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function PlanForm({ category, plan, onSave, onCancel }) {
  const [form, setForm] = useState(plan ? {
    speed: plan.speed, title: plan.title || '', afterFup: plan.afterFup || '',
    data: plan.data || '', priceMonth: plan.priceMonth, priceThree: plan.priceThree || '',
    priceSix: plan.priceSix || '', priceTen: plan.priceTen || '',
    features: (plan.features || []).join('\n'), isActive: plan.isActive,
  } : { ...emptyForm, isActive: true });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('category', category);
    fd.append('speed', form.speed);
    fd.append('title', form.title);
    fd.append('afterFup', form.afterFup);
    fd.append('data', form.data);
    fd.append('priceMonth', form.priceMonth);
    fd.append('priceThree', form.priceThree || 0);
    fd.append('priceSix', form.priceSix || 0);
    fd.append('priceTen', form.priceTen || 0);
    fd.append('isActive', String(form.isActive));
    fd.append('features', JSON.stringify(form.features.split('\n').filter(Boolean)));

    try {
      if (plan) await updatePlan(plan._id, fd);
      else await createPlan(fd);
      onSave();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    className: 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
  });

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">{plan ? 'Edit Plan' : 'Add New Plan'}</h4>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div><label className="text-xs text-gray-500 mb-1 block">Speed *</label><input {...f('speed')} placeholder="e.g. 100 Mbps" required /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">Plan Title</label><input {...f('title')} placeholder="e.g. Basic Plan" /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">Price/Month (₹) *</label><input {...f('priceMonth')} type="number" placeholder="399" required /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">3 Months (₹)</label><input {...f('priceThree')} type="number" /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">6 Months (₹)</label><input {...f('priceSix')} type="number" /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">10 Months (₹)</label><input {...f('priceTen')} type="number" /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">After FUP Speed</label><input {...f('afterFup')} placeholder="e.g. 2 Mbps" /></div>
        <div><label className="text-xs text-gray-500 mb-1 block">Data Limit</label><input {...f('data')} placeholder="e.g. 3500 GB" /></div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Status</label>
          <select value={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="true">Active</option>
            <option value="false">Hidden</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-3">
          <label className="text-xs text-gray-500 mb-1 block">Features (one per line)</label>
          <textarea {...f('features')} rows={3} placeholder="Unlimited Data&#10;Free Installation&#10;24/7 Support" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="col-span-2 md:col-span-3 flex gap-3">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-60">
            <MdSave size={16} /> {saving ? 'Saving...' : (plan ? 'Update Plan' : 'Add Plan')}
          </button>
          <button type="button" onClick={onCancel} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
            <MdClose size={16} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function AdminPlans() {
  const [activeTab, setActiveTab] = useState('featured');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [msg, setMsg] = useState('');

  const load = async (cat) => {
    setLoading(true);
    try {
      const data = await getAllPlans(cat);
      setPlans(data);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(activeTab); }, [activeTab]);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try {
      await deletePlan(id);
      flash('Plan deleted');
      load(activeTab);
    } catch (err) {
      flash(err.message);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditPlan(null);
    flash('Plan saved successfully!');
    load(activeTab);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Plan Management</h2>
          <button onClick={() => { setEditPlan(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all">
            <MdAdd size={18} /> Add Plan
          </button>
        </div>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.includes('success') || msg.includes('deleted') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
          </div>
        )}

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setActiveTab(cat.key)}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-all ${activeTab === cat.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Add/Edit form */}
        {(showForm || editPlan) && (
          <PlanForm
            category={activeTab}
            plan={editPlan}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditPlan(null); }}
          />
        )}

        {/* Plans table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading plans...</div>
          ) : plans.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No plans found. Click "Add Plan" to create one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Speed</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Price/Mo</th>
                    {plans[0]?.afterFup && <th className="px-4 py-3 text-left font-semibold text-gray-600">After FUP</th>}
                    {plans[0]?.data && <th className="px-4 py-3 text-left font-semibold text-gray-600">Data</th>}
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <PlanRow key={plan._id} plan={plan}
                      onEdit={(p) => { setEditPlan(p); setShowForm(false); }}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPlans;
