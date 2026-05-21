export const fetchTutors = async (searchParams = {}) => {
  const query = new URLSearchParams();
  if (searchParams.search) query.append("search", searchParams.search);
  if (searchParams.startDate) query.append("startDate", searchParams.startDate);
  if (searchParams.endDate) query.append("endDate", searchParams.endDate);
  
  const queryString = query.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/tutors${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  const tutors = await res.json();
  return tutors || [];
};

export const fetchFeaturedTutors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, {
    cache: "no-store",
  });
  const tutors = await res.json();
  return tutors || [];
};
