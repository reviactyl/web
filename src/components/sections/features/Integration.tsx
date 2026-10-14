"use client";
import React from "react";
import { motion } from "framer-motion";
import ShikiHighlighter from "react-shiki";
import Button from "@/components/ui/Button";
import { FaCode } from "react-icons/fa6";

const requestCode = `curl --request GET \\
  --url "https://reviactyl.test/api/client/account" \\
  --header "Authorization: Bearer YOUR_API_KEY" \\
  --header "Accept: application/json"`;

const responseCode = `{
  "object": "user",
  "attributes": {
    "id": 1,
    "admin": true,
    "username": "bxd",
    "email": "bxd@reviactyl.app",
    "first_name": "BXD",
    "last_name": "CEO",
    "language": "en",
    "file_editor": "cm",
    "avatar_style": "initials",
    "avatar_animated": true,
    "archive_format": "tar.gz"
  }
}`;

const shikiWrapper = "overflow-x-auto text-left text-xs leading-relaxed [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!";

const Integration: React.FC = () => {
    return (
        <section className="relative overflow-hidden border-b border-gray-50/10 bg-gray-950 text-gray-50">
            <div className="relative mx-auto mb-12 grid max-w-6xl items-center gap-12 px-6 py-4 md:grid-cols-2 md:gap-16 md:py-2">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 text-left"
                >
                    <h2 className="bg-linear-to-b from-gray-50 to-gray-400 bg-clip-text pb-1 text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                        External Integration <br /> through API <FaCode className="h-10 text-gray-50 inline-flex rotate-12" />
                    </h2>
                    <p className="max-w-md text-base leading-relaxed text-gray-400">
                        Connect Reviactyl to your billing system, Discord bot or custom dashboard. Manage servers,
                        read live resource stats and automate everything from outside the panel with a simple REST
                        API.
                    </p>

                    <div className={`max-w-md rounded-xl border border-gray-50/10 bg-gray-900/80 p-4 backdrop-blur-xl ${shikiWrapper}`}>
                        <ShikiHighlighter
                            language="bash"
                            theme="github-dark"
                            showLanguage={false}
                            addDefaultStyles={false}
                        >
                            {requestCode}
                        </ShikiHighlighter>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button.Secondary to="https://docs.reviactyl.app/client-api" className="w-fit">
                            Client API
                        </Button.Secondary>
                        <Button.Secondary to="https://docs.reviactyl.app/application-api" className="w-fit">
                            Application API
                        </Button.Secondary>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="overflow-hidden rounded-2xl border border-gray-50/10 bg-gray-900/80 shadow-2xl backdrop-blur-xl"
                >
                    <div className="flex border-b border-gray-50/10">
                        <div className="relative bg-gray-50/5 px-5 py-3 font-mono text-xs text-gray-50">
                            response.json
                            <span className="absolute inset-x-0 bottom-0 h-px bg-gray-50" />
                        </div>
                    </div>

                    <div className={`p-5 sm:text-sm ${shikiWrapper}`}>
                        <ShikiHighlighter
                            language="json"
                            theme="github-dark"
                            showLanguage={false}
                            addDefaultStyles={false}
                        >
                            {responseCode}
                        </ShikiHighlighter>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Integration;
