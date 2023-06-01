import { Box, Text, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";


const AnimatedCard = () => {
    const theme = useTheme();
    const cardVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.5,
            },
        },
    };

    const pulseAnimation = {
        pulse: {
            scale: [1, 0.95, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
            }
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            style={{
                width: "100%",
                padding: theme.space[5],
                boxShadow: theme.shadows.md,
                borderWidth: "1px",
                flex: "1",
                borderRadius: theme.radii.md,
                background: `linear-gradient(to right, #ECE3FC, #ECE3FC)`, // Измените на ваше предпочтение
                color: theme.colors.gray[800], // Измените на ваше предпочтение
            }}
        >
            <motion.div
                variants={pulseAnimation}
                animate="pulse"
            >
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Select Service
                </Text>
            </motion.div>
        </motion.div>
    );
};

export default AnimatedCard;
