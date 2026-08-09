"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  className?: string;
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    name = "Michael Chen",
    title = "Senior Software Engineer, Cloud Infrastructure",
    description = "Michael Chen is a seasoned software engineer at TechFlow Solutions with over 8 years of experience building scalable cloud infrastructure and microservices. He specializes in DevOps automation and leads the platform engineering team that serves millions of users daily.",
    imageUrl = "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl = "#",
    twitterUrl = "#",
    youtubeUrl = "#",
    linkedinUrl = "#",
    className,
  } = props;

  const socialIcons = [
    { icon: Github, url: githubUrl, label: "GitHub" },
    { icon: Twitter, url: twitterUrl, label: "Twitter" },
    { icon: Youtube, url: youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: linkedinUrl, label: "LinkedIn" },
  ].filter(({ url }) => url && url !== "#");

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop */}
      <div className='hidden md:flex relative items-center'>
        {/* Square Image */}
        <div className='w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={name}
            width={470}
            height={470}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>
        {/* Overlapping Card */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='bg-white dark:bg-card rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              {name}
            </h2>

            <p className='text-sm font-medium text-gray-700 dark:text-gray-500'>
              {title}
            </p>
          </div>

          <p className='text-black dark:text-white text-base leading-relaxed mb-8'>
            {description}
          </p>

          <div className='flex space-x-4'>
            {socialIcons.map(({ icon: Icon, url, label }) => (
              <Link
                key={label}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white dark:text-gray-900' />
              </Link>
            ))}
          </div>
        </m.div>
      </div>

      {/* Mobile */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='md:hidden max-w-sm mx-auto text-center bg-transparent'
      >
        {/* Square Mobile Image */}
        <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6 flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>

        <div className='px-4'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
            {name}
          </h2>

          <p className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-4'>
            {title}
          </p>

          <p className='text-black dark:text-white text-sm leading-relaxed mb-6'>
            {description}
          </p>

          <div className='flex justify-center space-x-4'>
            {socialIcons.map(({ icon: Icon, url, label }) => (
              <Link
                key={label}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white dark:text-gray-900' />
              </Link>
            ))}
          </div>
        </div>
      </m.div>
    </div>
  );
}
