'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Template {
  id: string;
  name: string;
  description: string;
  criteriaWeights: Record<string, number>;
  createdAt: string;
  isDefault: boolean;
}

interface TemplateManagerProps {
  templates: Template[];
  onLoadTemplate: (template: Template) => void;
  onSaveTemplate: (name: string, description: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export default function TemplateManager({
  templates,
  onLoadTemplate,
  onSaveTemplate,
  onDeleteTemplate
}: TemplateManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      onSaveTemplate(templateName, templateDescription);
      setTemplateName('');
      setTemplateDescription('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Saved Templates</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-cta text-white font-medium text-sm rounded-lg hover:opacity-90 transition-smooth"
        >
          <Icon name="PlusIcon" size={18} />
          <span>Save Current</span>
        </button>
      </div>

      <div className="flex grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="w-full min-w-0 p-6 bg-surface border border-border rounded-lg hover:border-brand-primary/50 transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-text-primary line-clamp-1">
                  {template.name}
                </h4>
                {template.isDefault && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                    Default
                  </span>
                )}
              </div>
              {!template.isDefault && (
                <button
                  onClick={() => onDeleteTemplate(template.id)}
                  className="p-1 hover:bg-error/10 rounded transition-smooth flex-shrink-0"
                  aria-label={`Delete ${template.name}`}
                >
                  <Icon name="TrashIcon" size={16} className="text-error" />
                </button>
              )}
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {template.description}
            </p>

            <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
              <span>{Object.keys(template.criteriaWeights).length} criteria</span>
              <span className="whitespace-nowrap">{template.createdAt}</span>
            </div>

            <button
              onClick={() => onLoadTemplate(template)}
              className="w-full px-4 py-2 bg-brand-primary text-white font-medium text-sm rounded-lg hover:opacity-90 transition-smooth"
            >
              Load Template
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-surface rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Save Template</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="XMarkIcon" size={20} className="text-text-secondary" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Conservative Growth Strategy"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-smooth"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe the purpose of this template..."
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-smooth resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-muted text-text-secondary font-medium rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim()}
                  className="flex-1 px-4 py-3 bg-brand-cta text-white font-medium rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}