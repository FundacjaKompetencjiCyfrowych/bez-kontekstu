import { defineQuery } from "next-sanity";

// https://www.sanity.io/docs/content-lake/query-cheat-sheet

export const projectsPageQuery = defineQuery(`*[_type == "projects" && language == $lang][0]{
  meta,
  "projects": [
    ...*[_type == "project" && language == $lang]
      | order(timestamp desc, _id asc){
        _id,
        cover {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        },
        name,
        slug,
        timestamp,
        _type
      },
    ...*[_type == "sounds" && language == $lang]
      | order(timestamp desc, _id asc){
        _id,
        name,
        cover {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        },
        timestamp,
        _type,
        slug,
      }
  ]
}`);

export const projectPageQuery = defineQuery(`*[slug.current == $slug && language == $lang][0]{
  meta,
  _id,
  name,
  timestamp,
  slug,

  "next": *[
    _type in ["project", "sounds"] &&
    language == $lang &&
    (
      timestamp < ^.timestamp ||
      (timestamp == ^.timestamp && _id > ^._id)
    )
  ] | order(timestamp desc, _id asc)[0]{
    name,
    slug
  },

  "previous": *[
    _type in ["project", "sounds"] &&
    language == $lang &&
    (
      timestamp > ^.timestamp ||
      (timestamp == ^.timestamp && _id < ^._id)
    )
  ] | order(timestamp asc, _id desc)[0]{
    name,
    slug
  },

  contributors,
  featured,
  multimedia[]{
    _type == "richImage" => {
      asset->{
        _id,
        url,
        metadata{
          lqip,
          dimensions,
        }
      },
      alt,
      hotspot,
      crop
    },
    _type != "richImage" => @,
  },
  description
}`);

export const cooperatorsPageQuery = defineQuery(`*[_type == "cooperators" && language == $lang][0]{
  "cooperators": *[_type == "cooperator" && language == $lang]
    | order(slug.current asc, _id asc){
      _id,
      image {
        asset->{
          _id,
          url,
          metadata{
            lqip,
            dimensions,
          }
        },
        alt,
        hotspot,
        crop
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
    asset->{
      _id,
      url,
      metadata{
        lqip,
        dimensions,
      }
    },
    alt,
    hotspot,
    crop
  },
  socials[],
  projects[],

  "next": *[
    _type == "cooperator" &&
    language == $lang &&
    (
      slug.current > ^.slug.current ||
      (slug.current == ^.slug.current && _id > ^._id)
    )
  ] | order(slug.current asc, _id asc)[0]{
    name,
    slug
  },

  "previous": *[
    _type == "cooperator" &&
    language == $lang &&
    (
      slug.current < ^.slug.current ||
      (slug.current == ^.slug.current && _id < ^._id)
    )
  ] | order(slug.current desc, _id desc)[0]{
    name,
    slug
  },
}`);

export const homePageQuery = defineQuery(`*[_type == "home" && language == $lang][0]{
  meta,
  manifest,
  projects{
    featureRandom,
    randomCount,
    ...,
    "featured": select(
      featureRandom == true => *[_type == "project" && language == $lang]{
        _id,
        slug,
        cover{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        },
      },
      featured[]->{
        _id,
        slug,
        cover{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        },
      }
    ),
  },
  cooperators{
    featureRandom,
    randomCount,
    ...,
    "featured": select(
      featureRandom == true => *[_type == "cooperator" && language == $lang]{
        _id,
        slug,
        name,
        image{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        }
      },
      featured[]->{
        _id,
        slug,
        name,
        image{
          asset->{
            _id,
            url,
            metadata{
              lqip,
              dimensions,
            }
          },
          alt,
          hotspot,
          crop
        }
      }
    ),
  },
  support,
}`);

export const soundsPageQuery = defineQuery(`*[_type == "sounds" && language == $lang][0]{
  meta,
  trackUrls,
  name,
  cover,
  timestamp,
  "next": *[
    _type == "project" &&
    language == $lang &&
    (
      timestamp < ^.timestamp ||
      (timestamp == ^.timestamp && _id > ^._id)
    )
  ] | order(timestamp desc, _id asc)[0]{
    name,
    slug
  },

  "previous": *[
    _type == "project" &&
    language == $lang &&
    (
      timestamp > ^.timestamp ||
      (timestamp == ^.timestamp && _id < ^._id)
    )
  ] | order(timestamp asc, _id desc)[0]{
    name,
    slug
  },
}`);

export const manifestPageQuery = defineQuery(`*[_type == "manifest" && language == $lang][0]{
  meta,
  hero,
  sections
}`);

export const donatorsPageQuery = defineQuery(`*[_type == "donators" && language == $lang][0]{
  meta,
  sections[],
  hero
}`);

export const privacyPageQuery = defineQuery(`*[_type == "privacy" && language == $lang][0]{
  meta,
  content
}`);

export const contactPageQuery = defineQuery(`*[_type == "contact" && language == $lang][0]{
  meta,
  fields
}`);

export const settingsQuery = defineQuery(`*[_type == "settings" && language == $lang][0]`);

export const allSlugsQuery = defineQuery(`*[_type in ["project", "sounds", "cooperator"]]{
  "slug": slug.current,
  language,
  _type
}`);
