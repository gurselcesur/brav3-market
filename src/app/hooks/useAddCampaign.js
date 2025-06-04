import { useState } from "react";
import { createCampaign } from "../api/campaignService";
import { useRouter } from "next/navigation";

export function useAddCampaign() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const submitCampaign = async (campaign) => {
    try {
      setLoading(true);
      await createCampaign(campaign);
      router.push("/campaign");
    } catch (err) {
      setError("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return { submitCampaign, loading, error };
}