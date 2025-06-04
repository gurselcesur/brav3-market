const BASE_URL = "http://localhost:8000";

export async function getCampaigns() {
  const res = await fetch(`${BASE_URL}/campaigns`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}

export async function getCampaignById(id) {
  const res = await fetch(`${BASE_URL}/campaigns/${id}`);
  if (!res.ok) throw new Error("Campaign not found");
  return res.json();
}

export async function createCampaign(campaign) {
  const res = await fetch(`${BASE_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campaign)
  });
  if (!res.ok) throw new Error("Failed to create campaign");
  return res.json();
}
