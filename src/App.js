import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Modal, IconButton, Radio, Select, MenuItem, FormControlLabel, FormControl, RadioGroup, Slider } from "@mui/material";
import { MdDelete } from "react-icons/md";

function App() {
  const [submitStates, setSubmitStates] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(submitStates));
  }, [submitStates]);

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (index) => {
    setSubmitStates((prev) => prev.filter((_, i) => i !== index));
  };

  const PopupModal = () => {
    const [newActivity, setNewActivity] = useState({
      Activity: "",
      Price: "",
      Type: "education",
      Booking: true,
      Accessibility: 0.0,
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewActivity((prevState) => ({
        ...prevState,
        [name]: name === "Price" ? value.replace(/[^0-9.]/g, "") : value,
      }));
    };

    const handleSubmit = () => {
      if (newActivity.Activity.trim() === "" || newActivity.Price === "") {
        alert("Please fill in all fields!");
        return;
      }
      setSubmitStates((prevState) => {
        const updatedList = [...prevState, newActivity];
        localStorage.setItem("activities", JSON.stringify(updatedList));
        return updatedList;
      });

      setNewActivity({
        Activity: "",
        Price: "",
        Type: "education",
        Booking: true,
        Accessibility: 0.0,
      });

      setIsOpen(false);
    };

    return (
      <Modal open={isOpen} onClose={() => setIsOpen(false)} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ backgroundColor: "white", p: 4, borderRadius: 2, width: 400 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Add Activity</Typography>
          
          <TextField
            name="Activity"
            onChange={handleChange}
            label="Activity"
            value={newActivity.Activity}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            name="Price"
            onChange={handleChange}
            label="Price"
            type="text"
            value={newActivity.Price}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Select
            name="Type"
            value={newActivity.Type}
            fullWidth
            onChange={(e) => {
              setNewActivity(prev => ({
                ...prev,
                Type: e.target.value, 
              }));
            }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="recreational">Recreational</MenuItem>
            <MenuItem value="social">Social</MenuItem>
            <MenuItem value="diy">DIY</MenuItem>
            <MenuItem value="charity">Charity</MenuItem>
            <MenuItem value="cooking">Cooking</MenuItem>
            <MenuItem value="relaxation">Relaxation</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="busywork">Busywork</MenuItem>
          </Select>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
          <Typography variant="body1">Booking? </Typography>
          <RadioGroup
            row
            name="Booking"
            value={newActivity.Booking.toString()} 
            onChange={(e) => {
              setNewActivity((prev) => ({
                ...prev,
                Booking: e.target.value === "true", 
              }));
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Slider
          value={newActivity.Accessibility}
          min={0.0}
          max={1.0}
          step={0.1}
          onChange={(_, value) =>
            setNewActivity((prev) => ({ ...prev, Accessibility: value }))
          }
          sx={{ mb: 2 }}
        />

          <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>Submit</Button>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Box sx={{ margin: "0 auto", width: "80%", p: 2 }}>
        <Typography variant="h2" textAlign="center">List of Activities {submitStates.length}</Typography>
        {submitStates.length > 0 &&
          submitStates.map((submit, index) => (
            <Box key={index} sx={{ p: 1, borderBottom: "1px solid gray", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography>Activity: {submit.Activity}</Typography>
                <Typography>Price: ${submit.Price}</Typography>
                <Typography>Type: {submit.Type}</Typography>
                <Typography>Accessibility: {submit.Accessibility}</Typography>
                <Typography>Booking: {submit.Booking ? "Yes" : "No"}</Typography>
              </Box>

              <IconButton onClick={() => handleDelete(index)} color="error">
                <MdDelete />
              </IconButton>
            </Box>
          ))}
      </Box>

      <PopupModal />

      <Box sx={{ display: "flex", justifyContent: "right", p: 2 }}>
        <Button variant="contained" onClick={() => setIsOpen(true)}>Add New</Button>
      </Box>
    </>
  );
}

export default App;
