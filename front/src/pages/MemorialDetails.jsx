import { useLocation, useParams } from 'react-router-dom';

export default function MemorialDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const person = state?.person;

  if (!person || person._id !== id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>Memorial detail not available. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <img
          src={person.imageUrl || '/default-profile.png'}
          alt={person.name}
          className="w-full h-full object-cover rounded-xl shadow-xl"
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{person.name}</h1>
          <p className="text-lg text-gray-300">
            <strong>Father:</strong> {person.fatherName} <br />
            <strong>Grandfather:</strong> {person.grandfatherName} <br />
            <strong>Family Member:</strong> {person.familyMember}
          </p>

          <p className="text-gray-400">
            <strong>Born:</strong> {new Date(person.birthDate).toLocaleDateString()} in {person.placeOfBirth} <br />
            <strong>Died:</strong> {new Date(person.deathDate).toLocaleDateString()} in {person.placeOfDeath} <br />
            <strong>Burial Location:</strong> {person.burialLocation} <br />
            <strong>Cause of Death:</strong> {person.causeOfDeath}
          </p>

          {person.obituary && (
            <div>
              <h3 className="text-xl font-semibold mt-4">Obituary</h3>
              <p className="text-gray-300">{person.obituary}</p>
            </div>
          )}

          {person.shortStory && (
            <div>
              <h3 className="text-xl font-semibold mt-4">Short Story</h3>
              <p className="text-gray-300">{person.shortStory}</p>
            </div>
          )}

          {person.memorialMessage && (
            <div className="mt-6 p-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-900 rounded">
              <strong>Memorial Message:</strong> {person.memorialMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
