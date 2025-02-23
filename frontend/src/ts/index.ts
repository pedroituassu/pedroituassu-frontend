const url = "http://localhost:8080/experience";
const experiencesElement: HTMLElement | null = document.getElementById("experiences")

type Experience = {
  id: string,
  enterprise: string,
  role: string,
  location: string,
  startDate: string,
  endDate: string,
  description: string[]
}

function addExperience(experience: Experience) {
  const title: HTMLElement = document.createElement("h2")
  title.classList.add("experience-title")
  title.textContent = experience.role + " @ " + experience.enterprise

  const subtitle: HTMLElement = document.createElement("span")
  subtitle.classList.add("experience-subtitle")
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date: Date = new Date(experience.startDate)
  const startDate: string = months[date.getMonth()] + " " + date.getFullYear()

  var endDate: string;
  if (experience.endDate != null) {
    date = new Date(experience.endDate)
    endDate = months[date.getMonth()] + " " + date.getFullYear()
  } else {
    endDate = "Present"
  }
  subtitle.textContent = startDate + " - " + endDate

  const description: HTMLElement = document.createElement("ul")
  description.classList.add("experience-description")

  experience.description.forEach(item => {
    const descriptionItem: HTMLElement = document.createElement("li")
    descriptionItem.textContent = item
    description.appendChild(descriptionItem)
  })

  const section: HTMLElement = document.createElement("section")
  section.classList.add("experience")

  section.appendChild(title)
  section.appendChild(subtitle)
  section.appendChild(description)

  experiencesElement?.appendChild(section)
}

async function getExperiences(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const experiences = await response.json() as Experience[];

    experiences.forEach(experience => {
      addExperience(experience)
    })

  } catch (error) {
    console.error(error.message);
  }
}

getExperiences(url)