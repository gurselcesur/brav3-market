const CAMPAIGNS_KEY = 'brav3-campaigns';

function getCampaignsFromStorage() {
  if (typeof window === 'undefined') return [];
  const campaigns = localStorage.getItem(CAMPAIGNS_KEY);
  return campaigns ? JSON.parse(campaigns) : [];
}

function saveCampaignsToStorage(campaigns) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

export async function getCampaigns() {
  // Önce localStorage'dan kontrol et
  const cachedCampaigns = getCampaignsFromStorage();
  if (cachedCampaigns.length > 0) {
    return cachedCampaigns;
  }

  // localStorage boşsa data.json'dan oku
  const res = await fetch('/data.json');
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  const data = await res.json();
  
  // data.json'dan gelen verileri localStorage'a kaydet
  saveCampaignsToStorage(data.campaigns);
  return data.campaigns;
}

export async function getCampaignById(id) {
  const campaigns = await getCampaigns();
  return campaigns.find(campaign => campaign.id === id);
}

export async function createCampaign(campaign) {
  const campaigns = await getCampaigns();
  const newCampaign = {
    ...campaign,
    id: Date.now()
  };
  
  campaigns.push(newCampaign);
  saveCampaignsToStorage(campaigns);
  return newCampaign;
}
