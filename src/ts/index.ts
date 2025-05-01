const url: string = "http://164.152.36.131:8080/";
const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

type Role = {
  name: string,
  location: string,
  startDate: string,
  endDate: string,
  description: string[]
}

type AcademicEducation = {
  institute: string,
  title: string,
  location: string,
  startDate: string,
  endDate: string,
  roles: Role[]
}

type Experience = {
  id: string,
  enterprise: string,
  roles: Role[]
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

  const section: HTMLElement = document.createElement("section")
  section.classList.add("experience")

  section.appendChild(enterprise)

  experience.roles.forEach(role => {
    const roleTitle: HTMLElement = document.createElement("h3")
    roleTitle.classList.add("experience-role-title")
    roleTitle.textContent = role.name

    const location: HTMLElement = document.createElement("span")
    location.classList.add("academicEducation-role-dates")
    location.textContent = role.location

    const dates: HTMLElement = document.createElement("span")
    dates.classList.add("experience-role-dates")
    var date: Date = new Date(role.startDate)
    const startDate: string = months[date.getMonth()] + " " + date.getFullYear()

    var endDate: string;
    if (role.endDate != null) {
      date = new Date(role.endDate)
      endDate = months[date.getMonth()] + " " + date.getFullYear()
    } else {
      endDate = "Present"
    }
    dates.textContent = startDate + " - " + endDate

    const roleDescription: HTMLElement = document.createElement("ul")
    roleDescription.classList.add("experience-role-description")

    role.description.forEach(item => {
      const descriptionItem: HTMLElement = document.createElement("li")
      descriptionItem.textContent = item
      roleDescription.appendChild(descriptionItem)
    })

    const roleElement: HTMLElement = document.createElement("section")
    roleElement.classList.add("experience-role")
    roleElement.appendChild(roleTitle)
    roleElement.appendChild(location)
    roleElement.appendChild(dates)
    roleElement.appendChild(roleDescription)
    
    section.appendChild(roleElement)
  });
  
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

function createAcademicEducation(academicEducation: AcademicEducation) {
  const academicEducationsElement: HTMLElement | null = document.getElementById("academicEducations")

  const title: HTMLElement = document.createElement("h2")
  title.classList.add("academicEducation-title")
  title.textContent = academicEducation.title

  const institute: HTMLElement = document.createElement("span")
  institute.classList.add("academicEducation-subtitle")
  institute.textContent = academicEducation.institute

  const location: HTMLElement = document.createElement("span")
  location.classList.add("academicEducation-subtitle")
  location.textContent = academicEducation.location

  const dates: HTMLElement = document.createElement("span")
  dates.classList.add("academicEducation-subtitle")
  var date: Date = new Date(academicEducation.startDate)
  const startDate: string = months[date.getMonth()] + " " + date.getFullYear()

  var endDate: string;
  if (academicEducation.endDate != null) {
    date = new Date(academicEducation.endDate)
    endDate = months[date.getMonth()] + " " + date.getFullYear()
  } else {
    endDate = "Present"
  }
  dates.textContent = startDate + " - " + endDate

  const section: HTMLElement = document.createElement("section")
  section.classList.add("academicEducation")
  section.appendChild(title)
  section.appendChild(institute)
  section.appendChild(location)
  section.appendChild(dates)

  academicEducation.roles.forEach(role => {
    const roleTitle: HTMLElement = document.createElement("h3")
    roleTitle.classList.add("experience-role-title")
    roleTitle.textContent = role.name

    const location: HTMLElement = document.createElement("span")
    location.classList.add("academicEducation-role-dates")
    location.textContent = role.location

    const dates: HTMLElement = document.createElement("span")
    dates.classList.add("experience-role-dates")
    var date: Date = new Date(role.startDate)
    const startDate: string = months[date.getMonth()] + " " + date.getFullYear()

    var endDate: string;
    if (role.endDate != null) {
      date = new Date(role.endDate)
      endDate = months[date.getMonth()] + " " + date.getFullYear()
    } else {
      endDate = "Present"
    }
    dates.textContent = startDate + " - " + endDate

    const roleDescription: HTMLElement = document.createElement("ul")
    roleDescription.classList.add("experience-role-description")

    role.description.forEach(item => {
      const descriptionItem: HTMLElement = document.createElement("li")
      descriptionItem.textContent = item
      roleDescription.appendChild(descriptionItem)
    })

    const roleElement: HTMLElement = document.createElement("section")
    roleElement.classList.add("experience-role")
    roleElement.appendChild(roleTitle)
    roleElement.appendChild(location)
    roleElement.appendChild(dates)
    roleElement.appendChild(roleDescription)
    
    section.appendChild(roleElement)
  });

  academicEducationsElement?.appendChild(section)
}

async function addAcademicEducations() {
  try {
    const response = await fetch(url + "academic_educations");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const academicEducations = await response.json() as AcademicEducation[];

    academicEducations.forEach(academicEducation => {
      createAcademicEducation(academicEducation)
    })

  } catch (error) {
    console.error(error.message);
  }
}

function createProject(project: Project) {
  const projectsElement: HTMLElement | null = document.getElementById("projects")
  const title: HTMLElement = document.createElement("h2")
  title.classList.add("project-title")
  title.innerHTML = project.name + ' <span class="text-red-500">|</span> ' + '<a class="hover:text-red-500 transition-colors" href=' + project.url + ' target="_blank">src</a>'
  
  const technologies: HTMLElement = document.createElement("span")
  technologies.classList.add("project-subtitles")
  project.technologies.forEach(tech => {
    technologies.innerHTML = technologies.innerHTML + tech + ', '
  })
  technologies.innerHTML = technologies.innerHTML.slice(0, -2);

  const projectDate: HTMLElement = document.createElement("span");
  projectDate.classList.add("project-subtitles")
  const date: Date = new Date(project.date)
  const sdate: string = months[date.getMonth()] + " " + date.getFullYear();
  projectDate.innerHTML = sdate;

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
  section.appendChild(technologies)
  section.appendChild(projectDate)
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

addAcademicEducations()
addExperiences()
addProjects()
