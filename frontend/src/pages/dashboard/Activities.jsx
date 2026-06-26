import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { AuthContext } from '../../../context/AuthContext';
import { Plus, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const Activities = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch both activities and farms
      const [activitiesRes, farmsRes] = await Promise.all([
        supabase.from('activities').select('*, farms(name)').eq('user_id', user.id).order('date', { ascending: false }),
        supabase.from('farms').select('id, name').eq('user_id', user.id)
      ]);

      if (activitiesRes.error) throw activitiesRes.error;
      if (farmsRes.error) throw farmsRes.error;

      setActivities(activitiesRes.data || []);
      setFarms(farmsRes.data || []);
    } catch (err) {
      toast.error('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Activities Log</h1>
        <button className="bg-[#2D6A2D] hover:bg-[#1B4332] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors opacity-50 cursor-not-allowed" title="Coming soon">
          <Plus size={20} />
          Log Activity
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="flex justify-center mb-4 text-gray-400">
            <ClipboardList size={48} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No activities logged</h3>
          <p className="text-gray-500 mb-4">Keep track of your farming tasks here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((act) => (
                <tr key={act.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(act.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{act.farms?.name || 'Unknown Farm'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{act.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{act.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
