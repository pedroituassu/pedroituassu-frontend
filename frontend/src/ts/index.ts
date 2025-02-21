const url = "http://localhost:8080/experience";

type Experience = {
  id: string,
  enterprise: string,
  role: string,
  location: string,
  startDate: Date,
  endDate: Date,
  description: string[]
}

async function getExperiences(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const experiences = await response.json();
      
    } catch (error) {
      console.error(error.message);
    }
  }
  

async function displayExperiences(experiences: Experience[]) {
  experiences.forEach(experience => {
    console.log(experience)
  })
}

const experiences = getExperiences(url)
displayExperiences(experiences)