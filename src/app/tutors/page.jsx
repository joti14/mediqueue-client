import TutorCard from "@/components/tutor/TutorCard";

const TutorsPage = async () => {
    // Dynamic fetching from backend with direct rendering
    const res = await fetch('http://localhost:8000/tutors/', { cache: 'no-store' });
    const tutors = await res.json();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            
            {/* Header Title Section */}
            <div className="mb-10 text-center md:text-left max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
                    Find Your Academic Mentor
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                    Expert-led sessions for medical students. From Gross Anatomy to USMLE Step 1 preparation, 
                    find the right tutor to accelerate your learning.
                </p>
            </div>

            {/* Simple Responsive Tutor Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors?.map((tutor) => (
                    <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default TutorsPage;
