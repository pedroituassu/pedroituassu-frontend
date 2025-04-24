const url: string = "http://164.152.36.131:8080/";
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
  const enterprise: HTMLElement = document.createElement("h2")
  enterprise.classList.add("experience-enterprise")
  enterprise.textContent = experience.enterprise

  const roleTitle: HTMLElement = document.createElement("h3")
  roleTitle.classList.add("experience-role-title")
  roleTitle.textContent = experience.role

  const dates: HTMLElement = document.createElement("span")
  dates.classList.add("experience-role-dates")
  var date: Date = new Date(experience.startDate)
  const startDate: string = months[date.getMonth()] + " " + date.getFullYear()

  var endDate: string;
  if (experience.endDate != null) {
    date = new Date(experience.endDate)
    endDate = months[date.getMonth()] + " " + date.getFullYear()
  } else {
    endDate = "Present"
  }
  dates.textContent = startDate + " - " + endDate

  const roleDescription: HTMLElement = document.createElement("ul")
  roleDescription.classList.add("experience-role-description")

  experience.description.forEach(item => {
    const descriptionItem: HTMLElement = document.createElement("li")
    descriptionItem.textContent = item
    roleDescription.appendChild(descriptionItem)
  })

  const role: HTMLElement = document.createElement("section")
  role.classList.add("experience-role")
  role.appendChild(roleTitle)
  role.appendChild(dates)
  role.appendChild(roleDescription)

  const section: HTMLElement = document.createElement("section")
  section.classList.add("experience")

  section.appendChild(enterprise)
  section.appendChild(role)
  
  experiencesElement?.appendChild(section)
}

async function addExperiences() {
  try {
    const response = await fetch(url + "experiences");
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
  title.innerHTML = project.name + ' <span class="text-red-500">|</span> '
  project.technologies.forEach(tech => {
    title.innerHTML = title.innerHTML + tech + ', '
  })
  title.innerHTML = title.innerHTML.slice(0, -2)

  const subtitle: HTMLElement = document.createElement("span")
  subtitle.classList.add("project-subtitle")
  const date: Date = new Date(project.date)
  const sdate: string = months[date.getMonth()] + " " + date.getFullYear()
  subtitle.innerHTML = sdate + ' <span class="text-red-500">|</span> <a class="text-xl hover:text-red-500 transition-colors" href=' + project.url + ' target="_blank">src</a></span>'

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
    const response = await fetch(url + "projects")
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
