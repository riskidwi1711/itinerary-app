import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { api } from '@src/services/api';
import { useFinanceStore } from '@src/stores/financeStore';

const initialForm = (date = "") => ({
  date,
  waktuMulai: "",
  waktuSelesai: "",
  durasi: "",
  kegiatan: "",
  country: "Singapore",
  currency: "SGD",
  biayaLokal: "",
  biayaIDR: "",
  catatan: "",
  statusPembayaran: false,
  attachment: "",
});

const calculateDuration = (start, end) => {
  if (!start || !end) return "";
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = (new Date(0, 0, 0, eh, em) - new Date(0, 0, 0, sh, sm)) / 60000;
  return diff < 0 ? diff + 1440 : diff;
};

export const useItineraryStore = create((set, get) => ({
  // State
  allItineraryActivities: [],
  itinerary: [],
  editingItem: null,
  formItem: initialForm(),
  startDate: "2025-07-24",
  endDate: "2025-07-28",
  isLoading: false,
  error: null,

  // Actions
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => {
    set({ endDate });
    get().filterItinerary();
  },

  fetchItineraryActivities: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/itinerary');
      const activities = Array.isArray(res.data.data) ? res.data.data : [];
      set({ allItineraryActivities: activities, isLoading: false });
      get().filterItinerary();
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  filterItinerary: () => {
    const { allItineraryActivities, startDate, endDate } = get();
    const filtered = allItineraryActivities.filter(item => item.date >= startDate && item.date <= endDate);
    set({ itinerary: filtered });
  },

  handleInputChange: ({ target: { name, value, type, checked } }) => {
    set(state => ({
      formItem: {
        ...state.formItem,
        [name]: type === 'checkbox' ? checked : value,
      }
    }));
  },

  calculateBiayaIDR: () => {
    const { formItem } = get();
    const { exchangeRates } = useFinanceStore.getState();
    const biayaLokal = parseFloat(formItem.biayaLokal) || 0;
    const rate = exchangeRates[formItem.currency] || 1;
    const biayaIDR = biayaLokal * rate;
    set(state => ({
      formItem: {
        ...state.formItem,
        biayaIDR: biayaIDR.toFixed(2), // Keep 2 decimal places
      }
    }));
  },

  resetForm: () => {
    const { startDate } = get();
    set({ formItem: initialForm(startDate), editingItem: null });
  },

  // CRUD Actions
  addActivity: async (activityData) => {
    const newActivity = { 
      ...activityData, 
      id: uuidv4(), 
      durasi: calculateDuration(activityData.waktuMulai, activityData.waktuSelesai), 
      biaya: parseFloat(activityData.biayaLokal) || 0, // Use biayaLokal for biaya
    };
    try {
      const res = await api.post('/itinerary', newActivity);
      set(state => ({
        allItineraryActivities: [...state.allItineraryActivities, res.data.data]
      }));
      get().filterItinerary();
      return res.data.data;
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  },

  updateActivity: async (activityData) => {
    const updatedActivity = { 
      ...activityData, 
      durasi: calculateDuration(activityData.waktuMulai, activityData.waktuSelesai), 
      biaya: parseFloat(activityData.biayaLokal) || 0, // Use biayaLokal for biaya
    };
    try {
      const res = await api.put(`/itinerary/${activityData.id}`, updatedActivity);
      set(state => ({
        allItineraryActivities: state.allItineraryActivities.map(item =>
          item.id === activityData.id ? res.data.data : item
        )
      }));
      get().filterItinerary();
      return res.data.data;
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  },

  deleteActivity: async (id) => {
    try {
      await api.delete(`/itinerary/${id}`);
      set(state => ({
        allItineraryActivities: state.allItineraryActivities.filter(item => item.id !== id)
      }));
      get().filterItinerary();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  },
  
  handleEdit: (id) => {
    const item = get().allItineraryActivities.find(i => i.id === id);
    if (!item) return;
    set({ editingItem: item, formItem: { ...item, biayaLokal: item.biaya } });
  },

}));
