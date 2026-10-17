
"use client";

import { useEffect } from "react";

export default function PreviewScrollListener() {
    useEffect(() => {
        let highlightTimer;

        function handleMessage(event) {
            if (event.origin !== window.location.origin) return;

            if (event.data?.type !== "SCROLL_TO_SECTION") return;

            const sectionId = event.data.sectionId;

            if (typeof sectionId !== "string") return;

            const section = document.getElementById(sectionId);

            if (!section) return;

            // Remove the previous highlight
            document
                .querySelectorAll(".live-preview-highlight")
                .forEach((element) => {
                    element.classList.remove("live-preview-highlight");
                });

            clearTimeout(highlightTimer);

            // Add a red border to the selected section
            section.classList.add("live-preview-highlight");

            // Smooth scroll to the selected section
            section.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            // Remove the highlight after 3 seconds
            highlightTimer = setTimeout(() => {
                section.classList.remove("live-preview-highlight");
            }, 3000);
        }

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
            clearTimeout(highlightTimer);
        };
    }, []);

    return null;
}
