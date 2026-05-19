export const fetchTutors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
    cache: "no-store",
  });
  const tutors = await res.json();
  return tutors;
};

export const fetchFeaturedTutors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, {
    cache: "no-store",
  });
  const tutors = await res.json();
  return tutors;
};
