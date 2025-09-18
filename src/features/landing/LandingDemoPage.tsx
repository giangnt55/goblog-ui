import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion, useInView, useAnimation, type Variants } from "framer-motion";
import { easeOut } from "framer-motion";

type AnimatedCounterProps = {
  value: string | number;
  duration?: number;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = typeof value === "number" ? value : parseInt(value, 10);

      if (isNaN(end) || start === end) return;

      const totalMilSecDur = duration * 1000;
      const incrementTime = totalMilSecDur / end; 

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

type FadeInWhenVisibleProps = {
  children: React.ReactNode;
  delay?: number;
};

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.8, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};


type RotatingCardProps = {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
};

const RotatingCard: React.FC<RotatingCardProps> = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {frontContent}
        </Box>

        {/* Back of card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {backContent}
        </Box>
      </motion.div>
    </Box>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Header animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: easeOut }, // ✅ use easing function
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: isMobile ? '2.5rem' : '4rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Introducing our Intentions in Focus
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                maxWidth: '600px',
                color: theme.palette.text.secondary
              }}
            >
              To deliver innovative solutions that enhance everyday life through user-centric design. 
              To be a global leader in design, inspiring creativity and innovation.
            </Typography>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Be Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible delay={0.2}>
                <Card 
                  sx={{ 
                    height: '300px',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                    boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 800,
                          background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        Be
                      </Typography>
                    </motion.div>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          7
                        </Typography>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          35
                        </Typography>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </Grid>

            {/* Office Branch Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible delay={0.4}>
                <RotatingCard
                  frontContent={
                    <Card 
                      sx={{ 
                        height: '300px',
                        background: 'linear-gradient(145deg, #6a11cb 0%, #2575fc 100%)',
                        color: 'white',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                          Office Branch
                        </Typography>
                        <Typography variant="body1">
                          Our office fosters creativity and
                        </Typography>
                      </CardContent>
                    </Card>
                  }
                  backContent={
                    <Card 
                      sx={{ 
                        height: '300px',
                        background: 'linear-gradient(145deg, #2575fc 0%, #6a11cb 100%)',
                        color: 'white',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                          Collaborative spaces designed to inspire innovation and productivity.
                        </Typography>
                      </CardContent>
                    </Card>
                  }
                />
              </FadeInWhenVisible>
            </Grid>

            {/* Team Members Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible delay={0.6}>
                <Card 
                  sx={{ 
                    height: '300px',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                    boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      position: 'absolute',
                      width: '200%',
                      height: '200%',
                      background: 'conic-gradient(from 0deg, transparent, #2196F3, transparent)',
                    }}
                  />
                  
                  <CardContent 
                    sx={{ 
                      textAlign: 'center', 
                      zIndex: 1, 
                      background: 'white', 
                      borderRadius: '16px',
                      p: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      Team members
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      On-line is committed to delivering exceptional talent, with unwavering dedication. 
                      We collaborate closely to attract every project.
                    </Typography>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 800,
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        <AnimatedCounter value={100} />
                      </Typography>
                    </motion.div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Second Section */}
      <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Dedication Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible>
                <Card 
                  sx={{ 
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #6a11cb 0%, #2575fc 100%)',
                    color: 'white',
                    borderRadius: '20px',
                    minHeight: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Dedication
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    We are committed to excellence and professional improvement in every project. 
                    Our position aims at an consistently deliver customer growth.
                  </Typography>
                </Card>
              </FadeInWhenVisible>
            </Grid>

            {/* Mission Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible delay={0.2}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card 
                    sx={{ 
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #ff9966 0%, #ff5e62 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      minHeight: '250px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h3" gutterBottom>
                      01
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Mission
                    </Typography>
                    <Typography variant="body2">
                      To deliver innovative solutions that enhance everyday life through user-centric design.
                    </Typography>
                  </Card>
                </motion.div>
              </FadeInWhenVisible>
            </Grid>

            {/* ROI Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeInWhenVisible delay={0.4}>
                <Card 
                  sx={{ 
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #00b09b 0%, #96c93d 100%)',
                    color: 'white',
                    borderRadius: '20px',
                    minHeight: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Typography variant="h2" gutterBottom>
                      <AnimatedCounter value={500} />
                    </Typography>
                  </motion.div>
                  
                  <Typography variant="h6" gutterBottom>
                    ROI
                  </Typography>
                  <Typography variant="body2">
                    Airlines remarkable returns with our proven strengths, delivering a 0.09% ROI.
                  </Typography>
                </Card>
              </FadeInWhenVisible>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;