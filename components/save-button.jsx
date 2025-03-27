import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Save } from "lucide-react-native"

export default function SaveButton({ onPress, isSaving }) {
  return (
    <TouchableOpacity
      style={[styles.saveButton, isSaving && styles.savingButton]}
      onPress={onPress}
      disabled={isSaving}
    >
      <Save size={18} color="white" />
      <Text style={styles.saveButtonText}>{isSaving ? "Guardando..." : "Guardar"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#696999",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: "absolute",
    right: 15,
    top: 13,
    zIndex: 10,
  },
  savingButton: {
    backgroundColor: "#9ca3af",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Righteous-Regular",
  },
})

