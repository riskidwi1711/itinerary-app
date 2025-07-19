import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, CheckCircle } from 'lucide-react';
import Button from '@src/components/ui/Button';
import { Input } from '@src/components/ui/Input';
import { Select } from '@src/components/ui/Select';
import { Textarea } from '@src/components/ui/Textarea';
import Stepper from '@src/components/ui/Stepper';
import useItinerary from '../hooks/useItinerary';

const ActivityFormModalContent = () => {
  const { t } = useTranslation();
  const {
    formItem,
    handleInputChange,
    editingItem,
    handleSubmit,
    calculateBiayaIDR,
  } = useItinerary();

  useEffect(() => {
    calculateBiayaIDR();
  }, [formItem.biayaLokal, formItem.currency, calculateBiayaIDR]);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (editingItem !== null && formItem.attachment) {
      setImage(formItem.attachment);
      setImagePreview(formItem.attachment);
    } else {
      setImage(null);
      setImagePreview('');
    }
    setCurrentStep(1);
  }, [editingItem, formItem.attachment]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImage(result);
        setImagePreview(result);
        handleInputChange({ target: { name: 'attachment', value: result } });
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview('');
      handleInputChange({ target: { name: 'attachment', value: '' } });
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formItem.date || !formItem.waktuMulai || !formItem.waktuSelesai || !formItem.kegiatan) {
        alert(t('formValidation.step1'));
        return;
      }
    } else if (currentStep === 2) {
      if (!formItem.country || !formItem.currency || formItem.biayaLokal === "") {
        alert(t('formValidation.step2'));
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {currentStep === 1 && (
          <>
            <div className="form-group mb-4">
              <label className="form-label">{t('activityDate')}</label>
              <Input type="date" name="date" value={formItem.date} onChange={handleInputChange} />
            </div>
            <div className="form-group  mb-4">
              <label className="form-label">{t('activityName')}</label>
              <Input type="text" name="kegiatan" value={formItem.kegiatan} onChange={handleInputChange} placeholder={t('activityName')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label className="form-label">{t('startTime')}</label>
                <Input type="time" name="waktuMulai" value={formItem.waktuMulai} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label className="form-label">{t('endTime')}</label>
                <Input type="time" name="waktuSelesai" value={formItem.waktuSelesai} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t('notes')}</label>
              <Textarea name="catatan" value={formItem.catatan} onChange={handleInputChange} placeholder={t('notes')} className="h-24 resize-y"></Textarea>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="form-group mb-4">
              <label className="form-label">{t('country')}</label>
              <Select name="country" value={formItem.country} onChange={handleInputChange}>
                <option value="Singapore">Singapore</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Indonesia">Indonesia</option>
              </Select>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">{t('currency')}</label>
              <Select name="currency" value={formItem.currency} onChange={handleInputChange}>
                <option value="SGD">SGD</option>
                <option value="MYR">MYR</option>
                <option value="IDR">IDR</option>
              </Select>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">{t('costInLocalCurrency')}</label>
              <Input type="number" name="biayaLokal" value={formItem.biayaLokal} onChange={handleInputChange} placeholder={t('costInLocalCurrency')} />
            </div>
            <div className="form-group mb-4">
              <label className="form-label">{t('costInIDR')}</label>
              <Input type="number" name="biayaIDR" value={formItem.biayaIDR} onChange={handleInputChange} placeholder={t('costInIDR')} />
            </div>
          </>
        )}
        {currentStep === 3 && (
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="attachment" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
              ) : (
                <>
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">{t('uploadAttachment')}</p>
                </>
              )}
            </label>
            <Input id="attachment" name="attachment" type="file" className="sr-only" onChange={handleImageChange} />
            <div className="flex items-center mt-4">
              <Input type="checkbox" id="statusPembayaran" name="statusPembayaran" checked={formItem.statusPembayaran} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="statusPembayaran" className="ml-2 block text-sm text-gray-900">{t('paymentStatus')}</label>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stepper currentStep={currentStep} totalSteps={3} />
      
      <div className="min-h-[200px]">
        {renderStepContent()}
      </div>

      <div className="flex justify-between mt-8">
        <div>
          {currentStep > 1 && (
            <Button
              variant="secondary"
              onClick={handleBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              type="button"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              {t('back')}
            </Button>
          )}
        </div>
        <div>
          {currentStep < 3 && (
            <Button
              onClick={handleNext}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              type="button"
            >
              {t('next')} <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          )}
          {currentStep === 3 && (
            <Button
              type="submit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {editingItem !== null ? t('saveChanges') : t('addActivity')}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ActivityFormModalContent;
