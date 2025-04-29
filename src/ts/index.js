var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = "http://164.152.36.131:8080/";
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function createExperience(experience) {
    var experiencesElement = document.getElementById("experiences");
    var enterprise = document.createElement("h2");
    enterprise.classList.add("experience-enterprise");
    enterprise.textContent = experience.enterprise;
    var roleTitle = document.createElement("h3");
    roleTitle.classList.add("experience-role-title");
    roleTitle.textContent = experience.role;
    var dates = document.createElement("span");
    dates.classList.add("experience-role-dates");
    var date = new Date(experience.startDate);
    var startDate = months[date.getMonth()] + " " + date.getFullYear();
    var endDate;
    if (experience.endDate != null) {
        date = new Date(experience.endDate);
        endDate = months[date.getMonth()] + " " + date.getFullYear();
    }
    else {
        endDate = "Present";
    }
    dates.textContent = startDate + " - " + endDate;
    var roleDescription = document.createElement("ul");
    roleDescription.classList.add("experience-role-description");
    experience.description.forEach(function (item) {
        var descriptionItem = document.createElement("li");
        descriptionItem.textContent = item;
        roleDescription.appendChild(descriptionItem);
    });
    var role = document.createElement("section");
    role.classList.add("experience-role");
    role.appendChild(roleTitle);
    role.appendChild(dates);
    role.appendChild(roleDescription);
    var section = document.createElement("section");
    section.classList.add("experience");
    section.appendChild(enterprise);
    section.appendChild(role);
    experiencesElement === null || experiencesElement === void 0 ? void 0 : experiencesElement.appendChild(section);
}
function addExperiences() {
    return __awaiter(this, void 0, void 0, function () {
        var response, experiences, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url + "experiences")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Response status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    experiences = _a.sent();
                    experiences.forEach(function (experience) {
                        createExperience(experience);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createProject(project) {
    var projectsElement = document.getElementById("projects");
    var title = document.createElement("h2");
    title.classList.add("project-title");
    title.innerHTML = project.name + ' <span class="text-red-500">|</span> ' + '<a class="hover:text-red-500 transition-colors href=' + project.url + ' target="_blank">src</a>';
    var technologies = document.createElement("span");
    technologies.classList.add("project-subtitles");
    project.technologies.forEach(function (tech) {
        technologies.innerHTML = technologies.innerHTML + tech + ', ';
    });
    technologies.innerHTML = technologies.innerHTML.slice(0, -2);
    var projectDate = document.createElement("span");
    projectDate.classList.add("project-subtitles");
    var date = new Date(project.date);
    var sdate = months[date.getMonth()] + " " + date.getFullYear();
    projectDate.innerHTML = sdate;
    var description = document.createElement("ul");
    description.classList.add("project-description");
    project.description.forEach(function (item) {
        var descriptionItem = document.createElement("li");
        descriptionItem.textContent = item;
        description.appendChild(descriptionItem);
    });
    var section = document.createElement("section");
    section.classList.add("project");
    section.appendChild(title);
    section.appendChild(technologies);
    section.appendChild(projectDate);
    section.appendChild(description);
    projectsElement.appendChild(section);
}
function addProjects() {
    return __awaiter(this, void 0, void 0, function () {
        var response, projects, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url + "projects")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("response status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    projects = _a.sent();
                    projects.forEach(function (project) {
                        createProject(project);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
addExperiences();
addProjects();
