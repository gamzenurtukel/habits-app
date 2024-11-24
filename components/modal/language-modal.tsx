
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LangCode } from '@/i18n/LanguageUtils';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLanguage: (langCode: LangCode) => void;
}


const LanguageModal = ({ visible, onClose, onSelectLanguage }: LanguageModalProps) => {

  const { t } = useTranslation();

  const languagelist = [
    {
      langCode: LangCode.en,
      label: t("english"),
    },
    {
      langCode: LangCode.tr,
      label: t("turkish"),
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end items-center bg-transparent bg-opacity-50 rounded-lg ml-2 mr-2">
          <View className="w-full p-5 bg-white  items-center rounded-lg">
            <Text className="text-lg mb-5">
              {t("select_language")}
            </Text>

            <View className="flex flex-row gap-3  mb-5">
              {languagelist.map((item, index) => (

                <TouchableOpacity key={index} onPress={() => onSelectLanguage(item.langCode)} className="py-2 px-4 mb-2 rounded bg-blue-500">
                  <Text className="text-white text-center">{item.label}</Text>
                </TouchableOpacity>

              ))}
            </View>
            <TouchableOpacity onPress={onClose} className="py-2 px-4 mt-2 rounded bg-gray-600">
              <Text className="text-white">{
                t("cancel")
              }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

    </Modal>
  );
};

export default LanguageModal;