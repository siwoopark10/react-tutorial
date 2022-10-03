import "./SelectedModal.css";

const SelectedModal = ({ children, open, close }) => (
  <div
    className={`modal ${open ? "modal-show" : ""}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => {
      if (evt.target === evt.currentTarget) close();
    }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">My Schedule</h3>
          <button
            type="button"
            className="btn-close close-button"
            aria-label="Close"
            onClick={close}
          />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default SelectedModal;
