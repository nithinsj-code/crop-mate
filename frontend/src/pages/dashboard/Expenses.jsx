import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { AuthContext } from '../../context/AuthContext';
import { Plus, CircleDollarSign, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const Expenses = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*, farms(name)')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (err) {
      toast.error('Failed to load expenses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
        <button className="bg-[#2D6A2D] hover:bg-[#1B4332] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading expenses...</div>
      ) : expenses.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="flex justify-center mb-4 text-gray-400">
            <CircleDollarSign size={48} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No expenses recorded</h3>
          <p className="text-gray-500 mb-4">Start tracking your farm finances by adding an expense.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.farms?.name || 'Unknown Farm'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">₹{Number(exp.amount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Expenses;
