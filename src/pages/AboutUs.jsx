export default function AboutUs() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About This Memorial</h1>
          <div className="w-24 h-1 bg-[#383C00] mx-auto"></div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mission Statement */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We honor the lives of Tigrayan students and scholars whose dreams were 
              cut short by conflict. This memorial serves as a sacred space to remember 
              their potential and preserve their legacies.
            </p>
            <p className="text-gray-600">
              Through remembrance, we seek to transform grief into purpose and ensure 
              these tragedies are never forgotten nor repeated.
            </p>
          </div>
  
          {/* Origin Story */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">How This Began</h2>
            <p className="text-gray-600 mb-4">
              In 2020, a group of solders and civilians from Tigrayan heritage came together 
              after losing friends and family members in the war. What started as 
              a small memorial grew into this digital space for collective mourning 
              and historical preservation.
            </p>
            <p className="text-gray-600">
              Each name represents not just a life lost, but generations of potential 
              erased.
            </p>
          </div>
        </div>
  
        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Yohannes Berhe", role: "Historical Researcher", bio: "History PhD candidate" },
              { name: "Henok Gebremedhin", role: "Web Developer", bio: "Lost 3 cousins in Adigrat" },
              { name: "Kaleab Enderias", role: "Web Developer", bio: "Lost 3 cousins in Adigrat" },
              { name: "Mahlet Gebrekiros", role: "Web Developer", bio: "Lost 3 cousins in Adigrat" },
              { name: "Muley Tsegay", role: "Web Developer", bio: "Lost 3 cousins in Adigrat" },
              { name: "Tesfay Gebre", role: "Outreach Coordinator", bio: "Political Science '23" },
              { name: "Henok Gebremedhin", role: "Design Director", bio: "Architecture '21" },
              { name: "You", role: "Visitor", bio: "Keeping their memories alive" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-[#383C00] mb-2">{member.role}</p>
                <p className="text-xs text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Values Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: "Remembrance", 
                icon: "🕯️", 
                description: "We believe every life deserves to be remembered by name and story, not just statistics." 
              },
              { 
                title: "Truth", 
                icon: "📜", 
                description: "We document history accurately, honoring complex realities without simplification." 
              },
              { 
                title: "Hope", 
                icon: "🌱", 
                description: "Through mourning, we plant seeds for a future where such tragedies never recur." 
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us in Remembering</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether by contributing stories, volunteering, or simply bearing witness, 
            you become part of keeping these precious lives in our collective memory.
          </p>
          <button className="px-6 py-2 bg-[#383C00] text-white rounded-md hover:bg-[#2a2d00] transition">
            Get Involved
          </button>
        </div>
      </div>
    );
  }