const url: string = "http://localhost:8080/";
const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

type Experience = {
  id: string,
  enterprise: string,
  role: string,
  location: string,
  startDate: string,
  endDate: string,
  description: string[]
}

type Project = {
  id: string,
  name: string,
  url: string,
  date: string,
  technologies: string[],
  description: string[]
}

function createExperience(experience: Experience) {
  const experiencesElement: HTMLElement | null = document.getElementById("experiences")
  const title: HTMLElement = document.createElement("h2")
  title.classList.add("experience-title")
  title.textContent = experience.role + " @ " + experience.enterprise

  const subtitle: HTMLElement = document.createElement("span")
  subtitle.classList.add("experience-subtitle")
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

async function addExperiences() {
  try {
    const response = await fetch(url + "experience");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const experiences = await response.json() as Experience[];

    experiences.forEach(experience => {
      createExperience(experience)
    })

  } catch (error) {
    console.error(error.message);
  }
}

function createProject(project: Project) {
  const projectsElement: HTMLElement | null = document.getElementById("projects")
  const title: HTMLElement = document.createElement("h2")
  title.classList.add("project-title")
  title.innerHTML = project.name + '<span class="text-red-500">|</span>'
  project.technologies.forEach(tech => {
    title.innerHTML = title.innerHTML + tech + ', '
  })

  const subtitle: HTMLElement = document.createElement("span")
  subtitle.classList.add("project-subtitle")
  const date: Date = new Date(project.date)
  const sdate: string = months[date.getMonth()] + " " + date.getFullYear()
  subtitle.innerHTML = sdate + '<span class="text-red-500">|</span> <a class="text-xl hover:text-red-500 transition-colors" href=' + project.url + 'target="_blank">src</a></span>'

  const description: HTMLElement = document.createElement("ul")
  description.classList.add("project-description")
  project.description.forEach(item => {
    const descriptionItem: HTMLElement = document.createElement("li")
    descriptionItem.textContent = item
    description.appendChild(descriptionItem)
  })

  const section: HTMLElement = document.createElement("section")
  section.classList.add("project")
  section.appendChild(title)
  section.appendChild(subtitle)
  section.appendChild(description)

  projectsElement.appendChild(section)
}

async function addProjects() {
  try {
    const response = await fetch(url + "project")
    if (!response.ok) {
      throw new Error(`response status: ${response.status}`)
    }
    
    const projects = await response.json() as Project[]

    projects.forEach(project => {
        createProject(project)
    })

  } catch (error) {
    console.error(error.message);
  }
}

addExperiences()
addProjects()
