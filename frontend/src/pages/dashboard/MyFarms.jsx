import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { AuthContext } from '../../../context/AuthContext';
import { Plus, MapPin, Maximize, Droplets } from 'lucide-react';
import toast from 'react-hot-toast';

const MyFarms = () => {
  const { user } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newFarm, setNewFarm] = useState({ name: '', location_district: '', size: '', soil_type: '' });

  useEffect(() => {
    if (user) {
      fetchFarms();
    }
  }, [user]);

  const fetchFarms = async () => {
    try {
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFarms(data || []);
    } catch (err) {
      toast.error('Failed to load farms: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarm = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('farms').insert([
        {
          user_id: user.id,
          name: newFarm.name,
          location: { district: newFarm.location_district },
          size: parseFloat(newFarm.size),
          soil_type: newFarm.soil_type
        }
      ]).select();

      if (error) throw error;
      setFarms([...data, ...farms]);
      setShowModal(false);
      setNewFarm({ name: '', location_district: '', size: '', soil_type: '' });
      toast.success('Farm added successfully!');
    } catch (err) {
      toast.error('Failed to add farm: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Farms</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#2D6A2D] hover:bg-[#1B4332] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Farm
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading farms...</div>
      ) : farms.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="flex justify-center mb-4 text-gray-400">
            <MapPin size={48} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No farms added yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first farm to track activities and expenses.</p>
          <button onClick={() => setShowModal(true)} className="text-[#2D6A2D] font-medium hover:underline">
            + Create a Farm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-green-100 flex items-center justify-center">
                <span className="text-5xl">🌾</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{farm.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{farm.location?.district || 'Unknown Location'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize size={16} className="text-gray-400" />
                    <span>{farm.size} Acres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-gray-400" />
                    <span>{farm.soil_type || 'Unknown Soil'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Farm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Farm</h2>
            <form onSubmit={handleAddFarm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input required type="text" value={newFarm.name} onChange={e => setNewFarm({...newFarm, name: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. North Field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District / Location</label>
                <input required type="text" value={newFarm.location_district} onChange={e => setNewFarm({...newFarm, location_district: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. Pune, Maharashtra" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size (Acres)</label>
                <input required type="number" step="0.1" value={newFarm.size} onChange={e => setNewFarm({...newFarm, size: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 5.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <select required value={newFarm.soil_type} onChange={e => setNewFarm({...newFarm, soil_type: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Soil Type</option>
                  <option value="Alluvial">Alluvial</option>
                  <option value="Black">Black (Regur)</option>
                  <option value="Red">Red</option>
                  <option value="Laterite">Laterite</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2D6A2D] text-white rounded-lg hover:bg-[#1B4332]">Save Farm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFarms;
