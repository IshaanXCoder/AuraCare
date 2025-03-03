
export default function RegisterPopup({ isOpen, onClose, onRegister }) {
  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black/90 p-6 rounded-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <p className="mb-4">You need to create an account to continue.</p>
        <div className="flex gap-4">
          <Button onClick={onRegister}>Register Now</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  ) : null
}