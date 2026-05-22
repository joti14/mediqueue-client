export const fetchTutors = async (searchParams = {}) => {
  try {
    const query = new URLSearchParams();
    if (searchParams.search) query.append("search", searchParams.search);
    if (searchParams.startDate) query.append("startDate", searchParams.startDate);
    if (searchParams.endDate) query.append("endDate", searchParams.endDate);
    
    const queryString = query.toString();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const url = `${apiUrl}/tutors${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Fetch tutors failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const tutors = await res.json();
    return tutors || [];
  } catch (error) {
    console.error("Error in fetchTutors:", error);
    return [];
  }
};

export const fetchFeaturedTutors = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/featured-tutors`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Fetch featured tutors failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const tutors = await res.json();
    return tutors || [];
  } catch (error) {
    console.error("Error in fetchFeaturedTutors:", error);
    return [];
  }
};

