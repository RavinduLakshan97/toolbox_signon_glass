

function CommentForm({ comment, setComment, employeeType, setEmployeeType, onNext, onInvalid }) {


  const handleCommentChange = (e) => setComment(e.target.value);

  const handleEmployeeTypeChange = (e) => setEmployeeType(e.target.value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!employeeType || comment.trim() === '') {
      onInvalid(); 
      return;
    }
    onNext(false); 
  };
  

  return (
    <form onSubmit={handleCommentSubmit} className="bg-white p-4 rounded-lg shadow space-y-4">
      <fieldset className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <legend className="text-base font-medium text-gray-900">Employee Type</legend>
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="employeeType" 
              value="Supervisor" 
              checked={employeeType === 'Supervisor'}
              onChange={handleEmployeeTypeChange} 
              className="accent-blue-500" 
            />
            <span>Supervisor</span>
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <legend className="sr-only">ToolBox ID</legend>
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="employeeType" 
              value="SiteOperator" 
              checked={employeeType === 'SiteOperator'}
              onChange={handleEmployeeTypeChange} 
              className="accent-blue-500" 
            />
            <span>Site Operator</span>
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="comment" className="block text-base font-medium text-gray-900 mb-2">Comment</label>
        <textarea 
          // id="comment" 
          name="comment" 
          rows="4" 
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" 
          placeholder="Your comment..."
          value={comment} 
          onChange={handleCommentChange}
        ></textarea>
      </div>
    </form>
  );
}

export default CommentForm;
