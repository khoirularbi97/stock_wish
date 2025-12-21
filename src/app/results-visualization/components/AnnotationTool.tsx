'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Annotation {
  id: string;
  text: string;
  timestamp: string;
}

interface AnnotationToolProps {
  annotations: Annotation[];
  onAddAnnotation: (text: string) => void;
  onDeleteAnnotation: (id: string) => void;
}

const AnnotationTool = ({ annotations, onAddAnnotation, onDeleteAnnotation }: AnnotationToolProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnotation.trim()) {
      onAddAnnotation(newAnnotation);
      setNewAnnotation('');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 bg-warning text-warning-foreground rounded-md hover:opacity-90 transition-smooth text-sm md:text-xs font-medium whitespace-nowrap"
      >
        <Icon name="ChatBubbleLeftRightIcon" size={18} />
        <span>Annotations</span>
        {annotations.length > 0 && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs md:text-[10px] font-bold whitespace-nowrap">
            {annotations.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 md:w-72 sm:w-64 bg-popover border border-border rounded-lg shadow-xl z-50 animate-scale-in">
          <div className="p-4 md:p-3 sm:p-2 border-b border-border">
            <div className="flex items-center justify-between mb-3 md:mb-2">
              <h3 className="text-base md:text-sm font-semibold text-text-primary">Annotations</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded transition-smooth"
              >
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 md:gap-1.5">
              <input
                type="text"
                value={newAnnotation}
                onChange={(e) => setNewAnnotation(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 min-w-0 px-3 md:px-2 py-2 md:py-1.5 text-sm md:text-xs border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="px-3 md:px-2 py-2 md:py-1.5 bg-primary text-white rounded-md hover:opacity-90 transition-smooth flex-shrink-0"
              >
                <Icon name="PlusIcon" size={18} />
              </button>
            </form>
          </div>

          <div className="max-h-80 md:max-h-64 sm:max-h-48 overflow-y-auto">
            {annotations.length === 0 ? (
              <div className="p-8 md:p-6 sm:p-4 text-center text-text-secondary text-sm md:text-xs">
                No annotations yet. Add your first note above.
              </div>
            ) : (
              <div className="p-2 md:p-1.5 sm:p-1 space-y-2 md:space-y-1.5 sm:space-y-1">
                {annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="p-3 md:p-2 sm:p-1.5 bg-muted/50 rounded-md group hover:bg-muted transition-smooth"
                  >
                    <div className="flex items-start justify-between gap-2 md:gap-1.5">
                      <p className="text-sm md:text-xs text-text-primary flex-1 min-w-0 line-clamp-3">{annotation.text}</p>
                      <button
                        onClick={() => onDeleteAnnotation(annotation.id)}
                        className="p-1 text-error hover:bg-error/10 rounded opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0"
                      >
                        <Icon name="TrashIcon" size={14} />
                      </button>
                    </div>
                    <div className="text-xs md:text-[10px] text-text-secondary mt-1 whitespace-nowrap">{annotation.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnotationTool;