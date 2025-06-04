import { useEffect, useState } from 'react';
import { getCampaigns } from '../api/campaignService';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampaigns()
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  return { campaigns, loading };
}