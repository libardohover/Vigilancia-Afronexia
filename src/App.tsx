/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { NavigationControls } from './components/NavigationControls';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { ReferencesModal } from './components/ReferencesModal';
import { PrototypeViewerModal } from './components/PrototypeViewerModal';

import { Screen1Context } from './components/screens/Screen1Context';
import { Screen2Methodology } from './components/screens/Screen2Methodology';
import { Screen3ScientificResults } from './components/screens/Screen3ScientificResults';
import { Screen4TreeOfScience } from './components/screens/Screen4TreeOfScience';
import { Screen5Patents } from './components/screens/Screen5Patents';
import { Screen6TechMatrixTRL } from './components/screens/Screen6TechMatrixTRL';
import { Screen7PrototypeEvolution } from './components/screens/Screen7PrototypeEvolution';
import { Screen8ConclusionsRoadmap } from './components/screens/Screen8ConclusionsRoadmap';

import { SCREENS_DATA, INSTITUTIONAL_DATA } from './data/reportData';

export default function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [globalTimeSeconds, setGlobalTimeSeconds] = useState<number>(INSTITUTIONAL_DATA.totalTimeSeconds); // 900s (15:00)
  const [screenTimeSeconds, setScreenTimeSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Modals state
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isReferencesOpen, setIsReferencesOpen] = useState<boolean>(false);
  const [isPrototypeModalOpen, setIsPrototypeModalOpen] = useState<boolean>(false);

  const currentScreen = SCREENS_DATA[currentScreenIndex];
  const totalScreens = SCREENS_DATA.length;

  // Global Countdown Timer & Screen Timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && globalTimeSeconds > 0) {
      interval = setInterval(() => {
        setGlobalTimeSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        setScreenTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else if (globalTimeSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, globalTimeSeconds]);

  // Reset screen-specific timer on slide change
  const handleSelectScreen = useCallback((index: number) => {
    if (index >= 0 && index < totalScreens) {
      setCurrentScreenIndex(index);
      setScreenTimeSeconds(0);
    }
  }, [totalScreens]);

  const handleNext = useCallback(() => {
    if (currentScreenIndex < totalScreens - 1) {
      handleSelectScreen(currentScreenIndex + 1);
    }
  }, [currentScreenIndex, totalScreens, handleSelectScreen]);

  const handlePrev = useCallback(() => {
    if (currentScreenIndex > 0) {
      handleSelectScreen(currentScreenIndex - 1);
    }
  }, [currentScreenIndex, handleSelectScreen]);

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setGlobalTimeSeconds(INSTITUTIONAL_DATA.totalTimeSeconds);
    setScreenTimeSeconds(0);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation & presentation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handleToggleTimer();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsNotesOpen((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        setIsReferencesOpen((prev) => !prev);
      } else if (e.key >= '1' && e.key <= '8') {
        const num = parseInt(e.key, 10) - 1;
        if (num < totalScreens) {
          handleSelectScreen(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, totalScreens, handleSelectScreen]);

  // Render the current screen
  const renderCurrentScreen = () => {
    switch (currentScreen.id) {
      case 1:
        return <Screen1Context screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 2:
        return <Screen2Methodology screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 3:
        return <Screen3ScientificResults screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 4:
        return <Screen4TreeOfScience screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 5:
        return <Screen5Patents screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 6:
        return <Screen6TechMatrixTRL screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 7:
        return (
          <Screen7PrototypeEvolution
            screen={currentScreen}
            onOpenNotes={() => setIsNotesOpen(true)}
            onOpenPrototypeModal={() => setIsPrototypeModalOpen(true)}
          />
        );
      case 8:
        return (
          <Screen8ConclusionsRoadmap
            screen={currentScreen}
            onOpenNotes={() => setIsNotesOpen(true)}
            onOpenPrototypeModal={() => setIsPrototypeModalOpen(true)}
          />
        );
      default:
        return <Screen1Context screen={currentScreen} onOpenNotes={() => setIsNotesOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#041610] text-slate-100 flex flex-col justify-between font-sans selection:bg-[#00A859] selection:text-slate-950 overflow-x-hidden">
      {/* 1. Header with 15:00 Timer, Screen Navigation & Institutional Identity */}
      <Header
        currentScreen={currentScreen}
        currentScreenIndex={currentScreenIndex}
        totalScreens={totalScreens}
        globalTimeSeconds={globalTimeSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenReferences={() => setIsReferencesOpen(true)}
        onSelectScreen={handleSelectScreen}
      />

      {/* 2. Main Stage (16:9 aspect ratio responsive scientific canvas) */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-3 sm:py-5">
        <div className="w-full h-full flex-1 flex flex-col justify-center">
          {renderCurrentScreen()}
        </div>
      </main>

      {/* 3. Footer Navigation Bar */}
      <NavigationControls
        currentScreen={currentScreen}
        currentScreenIndex={currentScreenIndex}
        totalScreens={totalScreens}
        screenTimeSeconds={screenTimeSeconds}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenNotes={() => setIsNotesOpen(true)}
      />

      {/* 4. Modals & Drawers */}
      <SpeakerNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentScreen={currentScreen}
        currentScreenIndex={currentScreenIndex}
        totalScreens={totalScreens}
      />

      <ReferencesModal
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
      />

      <PrototypeViewerModal
        isOpen={isPrototypeModalOpen}
        onClose={() => setIsPrototypeModalOpen(false)}
      />
    </div>
  );
}
