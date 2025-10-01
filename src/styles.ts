import Colors from '@/constants/Colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    padding: 16,
    backgroundColor: Colors.white, 
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.zinc,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    color: Colors.zinc,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: Colors.white,
    color: Colors.zinc,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  itemText: {
    fontSize: 16,
    color: Colors.zinc,
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  addBtn: {
    marginBottom: 16,
    backgroundColor: Colors.green,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  editBtn: {
    backgroundColor: Colors.gray,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  removeBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  delete: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: Colors.green,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  cancelText: {
    color: Colors.zinc,
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: '#ff4d4d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
