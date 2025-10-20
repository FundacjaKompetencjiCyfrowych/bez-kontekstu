import { defineQuery } from "next-sanity";

// https://www.sanity.io/docs/content-lake/query-cheat-sheet

export const projectsPageQuery = defineQuery(`*[_type == "projects" && language == $lang][0]{
  "projects": *[_type == "project" && language == $lang] | order(timestamp desc){
    _id,
    cover {
      "lqip": asset->metadata.lqip,
      ...
    },
    name,
    slug,
    timestamp
  },
  meta
}`);

export const projectPageQuery = defineQuery(`*[slug.current == $slug && language == $lang][0]{
  meta,
  _id,
  name,
  timestamp,
  slug,
  "next":
    *[_type == "project" && language == $lang && timestamp > ^.timestamp]
    | order(timestamp asc)[0]{
      name,
      slug
    },
  "previous":
    *[_type == "project" && language == $lang && timestamp < ^.timestamp]
    | order(timestamp desc)[0]{
      name,
      slug
    },
  contributors,
  featured,
  multimedia,
  description
}`);

export const cooperatorsPageQuery = defineQuery(`*[_type == "cooperator" && language == $lang][0]{
  "cooperators": *[_type == "cooperator" && language == $lang] | order(name asc){
    _id,
    image {
      "lqip": asset->metadata.lqip,
      ...
    },
    name,
    slug,
  },
  meta
}`);

export const cooperatorPageQuery = defineQuery(`*[slug.current == $slug && language == $lang][0]{
  meta,
  _id,
  name,
  slug,
  description,
  image {
    "lqip": asset->metadata.lqip,
    ...
  },
  socials[],
  projects[],
    "next":
    *[_type == "cooperator" && language == $lang && name > ^.name]
    | order(name asc)[0]{
      name,
      slug
    },
  "previous":
    *[_type == "cooperator" && language == $lang && name < ^.name]
    | order(name desc)[0]{
      name,
      slug
    },
}`);
