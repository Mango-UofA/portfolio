"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect, useState } from "react";
import NyanCat from "./nyan-cat";
import { AnimatePresence } from "framer-motion";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    // console.log(
    //   "%cWhoa, look at you! 🕵️‍♂️\n\n" +
    //     "Peeking under the hood, eh? Just be careful, " +
    //     "you might find some 🐛 bugs that even I didn't know about! 😅\n\n" +
    //     "By the way, did you know the console is a portal to another dimension? 🌌 " +
    //     "Just kidding... or am I? 👽\n\n" +
    //     "Keep exploring, brave soul! 🛠️",
    //   "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
    // );
    if (typeof console !== "undefined") {
      console.clear();
      
      // Welcome message with better styling
      console.log(
        "%c🎉 WELCOME TO THE SECRET DEVELOPER ZONE! 🎉",
        "color: #FFD700; font-size: 20px; font-weight: bold; background: linear-gradient(45deg, #1a1a1a, #2d2d2d); padding: 15px; border-radius: 10px; text-align: center;"
      );
      
      console.log(
        "%cHey there, curious explorer! 🕵️‍♂️\n\n" +
          "🔍 You've found my secret developer console!\n" +
          "✨ Ready for some interactive fun?\n\n" +
          "🎮 COMMANDS TO TRY:\n" +
          "📝 Type: %cmanglam%c (and press Enter) - Meet the wizard behind the code! 🧙‍♂️\n" +
          "📝 Type: %chelp%c - See all available easter eggs\n" +
          "📝 Type: %cabout%c - Learn cool facts about this portfolio\n\n" +
          "🎯 Pro tip: Check out what happens when you press 'n' on your keyboard! 😉",
        "color: #00BFFF; font-size: 14px; font-weight: normal; line-height: 1.5; background-color: #0a0a0a; padding: 15px; border-radius: 8px;",
        "color: #00FF00; font-weight: bold; background-color: #1a4d1a; padding: 2px 6px; border-radius: 4px;",
        "color: #00BFFF;",
        "color: #FF69B4; font-weight: bold; background-color: #4d1a4d; padding: 2px 6px; border-radius: 4px;",
        "color: #00BFFF;",
        "color: #FFB347; font-weight: bold; background-color: #4d3d1a; padding: 2px 6px; border-radius: 4px;",
        "color: #00BFFF;"
      );

      // Enhanced commands with better functionality
      const commands = {
        manglam: () => {
          console.log(
            "%c🎪 TA-DA! You summoned the Portfolio Wizard! 🧙‍♂️✨\n\n" +
              "🏆 Meet Manglam Srivastav - Full-Stack Developer Extraordinaire!\n" +
              "💡 Fun Facts:\n" +
              "   • Built this entire portfolio with love and lots of coffee ☕\n" +
              "   • Speaks fluent JavaScript, TypeScript, and Bug-fixing 🐛\n" +
              "   • Can turn coffee into code at superhuman speeds ⚡\n" +
              "   • Currently pursuing MS in Information Science with ML focus 🎓\n\n" +
              "🎮 Want more fun? Try typing: help",
            "color: #FF4500; font-size: 16px; font-weight: bold; background: linear-gradient(45deg, #2d1a0a, #4d2d1a); padding: 15px; border-radius: 10px; border: 2px solid #FF4500;"
          );
          
          setTimeout(() => {
            console.log(
              "%c🐱 Psst... Love cats? 😺\n" +
                "Press the 'n' key on your keyboard and watch something magical happen! 🌟\n" +
                "(Make sure you're focused on the webpage, not the console!)",
              "color: #FF69B4; font-size: 14px; font-weight: bold; background-color: #2d1a2d; padding: 10px; border-radius: 8px; border: 1px solid #FF69B4;"
            );
          }, 3000);
        },
        
        help: () => {
          console.log(
            "%c🎯 EASTER EGG COMMAND CENTER 🎯\n\n" +
              "🔥 Available Commands:\n" +
              "   📝 manglam - Meet the developer behind this masterpiece\n" +
              "   📝 about - Cool facts about this portfolio\n" +
              "   📝 skills - See the tech stack powering this site\n" +
              "   📝 secret - Unlock a hidden surprise\n" +
              "   📝 clear - Clean up the console\n\n" +
              "⌨️ Keyboard Easter Eggs:\n" +
              "   🐱 Press 'n' - Cat lovers will understand\n" +
              "   🎨 More secrets hidden throughout the site...\n\n" +
              "💡 Tip: Each command has its own surprise!",
            "color: #00FF7F; font-size: 14px; background: linear-gradient(45deg, #0a2d0a, #1a4d1a); padding: 15px; border-radius: 10px; border: 2px solid #00FF7F;"
          );
        },
        
        about: () => {
          console.log(
            "%c🚀 PORTFOLIO TECH SPECS 🚀\n\n" +
              "⚡ Built with cutting-edge technology:\n" +
              "   • Next.js 15 - React framework for production\n" +
              "   • TypeScript - Type-safe JavaScript\n" +
              "   • Tailwind CSS - Utility-first styling\n" +
              "   • Framer Motion - Smooth animations\n" +
              "   • Three.js & Spline - 3D magic\n\n" +
              "🎨 Features:\n" +
              "   • Responsive design for all devices\n" +
              "   • Dark/Light theme switching\n" +
              "   • Real-time animations\n" +
              "   • SEO optimized\n" +
              "   • And secret easter eggs like this! 🥚\n\n" +
              "⭐ GitHub: github.com/Mango-UofA",
            "color: #87CEEB; font-size: 14px; background: linear-gradient(45deg, #0a1a2d, #1a2d4d); padding: 15px; border-radius: 10px; border: 2px solid #87CEEB;"
          );
        },
        
        skills: () => {
          console.log(
            "%c💻 DEVELOPER SKILL TREE 💻\n\n" +
              "🎯 Frontend Mastery:\n" +
              "   React ⭐⭐⭐⭐⭐ | Next.js ⭐⭐⭐⭐⭐ | TypeScript ⭐⭐⭐⭐⭐\n\n" +
              "🛠️ Backend Power:\n" +
              "   Node.js ⭐⭐⭐⭐⭐ | Express ⭐⭐⭐⭐⭐ | MongoDB ⭐⭐⭐⭐⭐\n\n" +
              "☁️ Cloud & DevOps:\n" +
              "   AWS ⭐⭐⭐⭐ | Docker ⭐⭐⭐⭐ | CI/CD ⭐⭐⭐⭐\n\n" +
              "🎨 Design & UX:\n" +
              "   Tailwind CSS ⭐⭐⭐⭐⭐ | Figma ⭐⭐⭐⭐ | Animation ⭐⭐⭐⭐",
            "color: #DDA0DD; font-size: 14px; background: linear-gradient(45deg, #2d0a2d, #4d1a4d); padding: 15px; border-radius: 10px; border: 2px solid #DDA0DD;"
          );
        },
        
        secret: () => {
          console.log(
            "%c🎭 CONGRATULATIONS! 🎭\n\n" +
              "🏆 You've unlocked the secret achievement!\n" +
              "🎉 Welcome to the exclusive 'Console Explorer' club!\n\n" +
              "🤫 Secret Developer Confession:\n" +
              "   This portfolio took 200+ cups of coffee ☕\n" +
              "   And countless late nights debugging! 🌙\n\n" +
              "🎁 Your reward: Knowing you're awesome! ✨\n\n" +
              "💌 Want to connect? Email: manglam.srivastav@arizona.edu",
            "color: #FFD700; font-size: 16px; background: linear-gradient(45deg, #4d3d0a, #6d5d1a); padding: 15px; border-radius: 10px; border: 3px solid #FFD700; animation: glow 2s ease-in-out infinite alternate;"
          );
        }
      };

      // Register all commands as global functions
      Object.keys(commands).forEach((cmd) => {
        if (!Object.hasOwn(window, cmd)) {
          Object.defineProperty(window, cmd, {
            get() {
              commands[cmd as keyof typeof commands]();
              return "";
            },
          });
        }
      });

      // Also register the original variations for backward compatibility
      ["manglam", "Manglam", "MANGLAM"].forEach((name) => {
        if (!Object.hasOwn(window, name)) {
          Object.defineProperty(window, name, {
            get() {
              commands.manglam();
              return "";
            },
          });
        }
      });
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
    </>
  );
};

export default EasterEggs;
