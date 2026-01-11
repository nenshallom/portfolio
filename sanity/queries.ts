import { groq } from "next-sanity";
import { client } from "./client";

export async function getProfileData() {
  // 1. Updated Profile Query (Removed socialLinks, ensured skills fields are fetched)
  const profileQuery = groq`*[_type == "profile"][0]{
    _id,
    fullName,
    headline,
    profileImage {
      alt,
      "image": asset->url
    },
    shortBio,
    email,
    phoneNumber,
    location,
    githubLink,
    linkedinLink,
    summary,
    skillsLanguages,
    skillsTools,
    skillsUiUx,
    skillsOther,
    certifications,
    resumeURL {
        "url": asset->url
    }
  }`;

  // 2. FIXED: Changed _type == "job" to _type == "experience"
  const experienceQuery = groq`*[_type == "experience"] | order(startDate desc){
    _id,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    description,
    logo {
      alt,
      "image": asset->url
    }
  }`;

  const projectQuery = groq`*[_type == "project"] | order(_createdAt desc){
    _id, 
    title, 
    tagline, 
    slug, 
    logo {
      alt,
      "image": asset->url
    },
    coverImage {
      alt,
      "image": asset->url
    },
    description,
    tags,
    link
  }`;

  const educationQuery = groq`*[_type == "education"] | order(endDate desc){
    _id,
    school,
    degree,
    startDate,
    endDate
  }`;

  // Fetch all data
  const [profile, experience, projects, education] = await Promise.all([
    client.fetch(profileQuery, {}, { next: { revalidate: 0 } }), // Added revalidate: 0 to force fresh data
    client.fetch(experienceQuery, {}, { next: { revalidate: 0 } }),
    client.fetch(projectQuery, {}, { next: { revalidate: 0 } }),
    client.fetch(educationQuery, {}, { next: { revalidate: 0 } }),
  ]);

  return {
    profile,
    experience,
    projects,
    education,
  };
}