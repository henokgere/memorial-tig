import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  Grid
} from '@mui/material';
import { Close, ArrowBack, ArrowForward } from '@mui/icons-material';

const VirtualMuseum = () => {
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(0);
  const navigate = useNavigate();

  // Museum rooms data
  const rooms = [
    {
      id: 1,
      name: "Origins Room",
      description: "Explore the historical context and outbreak of the conflict",
      image: "/room1-panorama.jpg",
      exhibits: [
        {
          id: 101,
          title: "Timeline of Events",
          description: "Chronological account of key events in the Tigray conflict",
          image: "/exhibits/timeline.jpg",
          detailedContent: "Detailed timeline content..."
        },
        {
          id: 102,
          title: "Geopolitical Context",
          description: "Regional factors influencing the conflict",
          image: "/exhibits/geopolitics.jpg",
          detailedContent: "Detailed geopolitical content..."
        }
      ]
    },
    {
      id: 2,
      name: "Memorial Hall",
      description: "Honoring those who perished in the war",
      image: "/room2-panorama.jpg",
      exhibits: [
        {
          id: 201,
          title: "Victims' Stories",
          description: "Personal accounts from those affected",
          image: "/exhibits/victims.jpg",
          detailedContent: "Detailed victims content..."
        },
        {
          id: 202,
          title: "Memorial Wall",
          description: "Names and photographs of those lost",
          image: "/exhibits/wall.jpg",
          detailedContent: "Detailed memorial content..."
        }
      ]
    },
    {
      id: 3,
      name: "Survivors' Gallery",
      description: "Stories of resilience and survival",
      image: "/room3-panorama.jpg",
      exhibits: [
        {
          id: 301,
          title: "Testimonies",
          description: "First-hand accounts from survivors",
          image: "/exhibits/testimonies.jpg",
          detailedContent: "Detailed testimonies content..."
        },
        {
          id: 302,
          title: "Rebuilding Lives",
          description: "Efforts to restore communities",
          image: "/exhibits/rebuilding.jpg",
          detailedContent: "Detailed rebuilding content..."
        }
      ]
    }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Room Panorama Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${rooms[currentRoom].image})`,
          opacity: 0.7
        }}
      />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-black bg-opacity-70 text-white text-center">
        <Typography variant="h4" className="text-2xl font-bold">
          Tigray War Memorial Museum
        </Typography>
        <Typography variant="subtitle1" className="text-lg">
          {rooms[currentRoom].name}
        </Typography>
      </div>

      {/* Exhibit Hotspots */}
      <div className="absolute inset-0 z-0">
        {rooms[currentRoom].exhibits.map((exhibit, index) => {
          // Calculate positions for exhibits in the room
          const positions = [
            { left: '20%', top: '40%' },
            { left: '60%', top: '50%' },
            { left: '40%', top: '30%' },
            { left: '70%', top: '60%' }
          ];
          
          return (
            <button
              key={exhibit.id}
              className="absolute w-12 h-12 rounded-full bg-red-600 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 flex items-center justify-center text-white font-bold shadow-lg"
              style={positions[index]}
              onClick={() => setSelectedExhibit(exhibit)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 z-10">
        <Button 
          variant="contained" 
          startIcon={<ArrowBack />}
          disabled={currentRoom === 0}
          onClick={() => setCurrentRoom(prev => prev - 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
        >
          Previous Room
        </Button>
        <Button 
          variant="contained" 
          endIcon={<ArrowForward />}
          disabled={currentRoom === rooms.length - 1}
          onClick={() => setCurrentRoom(prev => prev + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
        >
          Next Room
        </Button>
      </div>

      {/* Room Description */}
      <div className="absolute bottom-20 left-5 bg-black bg-opacity-70 text-white p-4 rounded max-w-xs z-10">
        <Typography variant="h6" className="text-xl font-bold">
          {rooms[currentRoom].name}
        </Typography>
        <Typography variant="body2" className="text-sm">
          {rooms[currentRoom].description}
        </Typography>
      </div>

      {/* Exit Button */}
      <Button 
        variant="contained" 
        className="absolute top-5 right-5 z-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md"
        onClick={() => navigate('/')}
      >
        Exit Museum
      </Button>

      {/* Exhibit Modal */}
      <Modal
        open={Boolean(selectedExhibit)}
        onClose={() => setSelectedExhibit(null)}
        className="flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <IconButton
            className="absolute right-2 top-2 z-10"
            onClick={() => setSelectedExhibit(null)}
          >
            <Close />
          </IconButton>

          {selectedExhibit && (
            <Grid container>
              <Grid item xs={12} md={6} className="h-full">
                <CardMedia
                  component="img"
                  image={selectedExhibit.image}
                  alt={selectedExhibit.title}
                  className="h-64 md:h-full object-cover"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent className="p-6">
                  <Typography gutterBottom variant="h4" className="text-2xl font-bold mb-4">
                    {selectedExhibit.title}
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 mb-4">
                    {selectedExhibit.description}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-6">
                    {selectedExhibit.detailedContent}
                  </Typography>
                  <Button 
                    variant="contained" 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      // Navigate to detailed view if needed
                      console.log('View more details');
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default VirtualMuseum;